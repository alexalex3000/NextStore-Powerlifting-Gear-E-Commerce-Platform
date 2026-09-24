"use server"

import { z } from "zod";
import { actionClient } from "@/shared/lib/safe-actions";
import { db } from "@/shared/db/db";
import { basket, basketItems, users } from "@/entities/user/model/schema";
import { cookies } from "next/headers";
import {and, eq, gte, sql} from "drizzle-orm";
import { orderItems, orders } from "@/entities/order/model/schema";
import {revalidatePath} from "next/cache";
import {product} from "@/entities/product/model/schema";

const orderSchema = z.object({
    shippingCountry: z.string().trim().nonempty("Input your Country"),
    shippingCity: z.string().trim().nonempty("Input your City"),
    shippingAddress: z.string().trim().nonempty("Input your Address"),
    phoneNumber: z.string().optional(),
})

export const orderDrop = actionClient
    .schema(orderSchema)
    .action(async ({ parsedInput }) => {
        const { shippingCountry, shippingCity, shippingAddress } = parsedInput;
        let { phoneNumber } = parsedInput;

        const cookiesClient = await cookies()
        const token = cookiesClient.get("session_token")?.value

        if (!token) {
            throw new Error("User not found");
        }

        const session = await db.query.sessions.findFirst({
            where: (sessions, { eq }) => eq(sessions.id, token),
        });

        if (!session) {
            throw new Error("User not found");
        }

        if (phoneNumber) {
            await db
                .update(users)
                .set({ phoneNumber })
                .where(eq(users.id, session.userId));
        } else {
            const data = await db
                .select({ phoneNumber: users.phoneNumber })
                .from(users)
                .where(eq(users.id, session.userId));

            if (!data[0]?.phoneNumber) {
                throw new Error("Phone number not found");
            }

            phoneNumber = data[0].phoneNumber;
        }

        const [basketData] = await db
            .select()
            .from(basket)
            .where(eq(basket.userId, session.userId));

        if (!basketData) {
            throw new Error("Basket not found");
        }

        const basketProducts = await db
            .select()
            .from(basketItems)
            .where(eq(basketItems.basketId, basketData.id));

        if (basketProducts.length === 0) {
            throw new Error("Basket is empty");
        }

        for (const item of basketProducts) {
            if (!item.productId || !item.sizes) {
                throw new Error("Invalid product in basket");
            }
        }

        const orderId = await db.transaction(async (tr) => {
            const [newOrder] = await tr
                .insert(orders)
                .values({
                    shippingCountry,
                    shippingCity,
                    shippingAddress,
                    phoneNumber: phoneNumber!,
                    userId: session.userId,
                    status: "pending",
                })
                .returning({ id: orders.id });

            if (!newOrder?.id) {
                throw new Error("Cant create order");
            }

            const itemsToInsert = basketProducts.map((item) => ({
                orderId: newOrder.id,
                productId: item.productId!,
                size: item.sizes!,
                count: item.count,
            }));

            await tr
                .insert(orderItems)
                .values(itemsToInsert);

            for(let item of itemsToInsert) {
                const [id] = await tr
                    .update(product)
                    .set({
                        count: sql`${product.count}-${item.count}`
                    })
                    .where(and(
                        eq(product.id, item.productId),
                        gte(product.count, item.count)
                    ))
                    .returning({id: product.id});

                if(!id?.id){
                    throw new Error("Cant create order, there are too few products");
                }
            }

            await tr
                .delete(basketItems)
                .where(eq(basketItems.basketId, basketData.id));

            return newOrder.id;
        });

        revalidatePath("/shop/basket")
        return orderId;
    });