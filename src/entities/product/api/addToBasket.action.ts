"use server";

import { z } from "zod";
import { actionClient } from "@/shared/lib/safe-actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getUserByCookies from "@/shared/lib/getUserByCookies";
import { db } from "@/shared/db/db";
import { eq, and } from "drizzle-orm";
import { basket, basketItems } from "@/entities/user/model/schema";
import {revalidateTag, updateTag} from "next/cache";

const sizes = z.enum(["XS", "S", "M", "L", "XL", "XXL", ""]);

const addToBasketSchema = z.object({
    id: z.string().nonempty(),
    size: sizes,
});

export const addToBasketDrop = actionClient
    .schema(addToBasketSchema)
    .action(async ({ parsedInput }) => {
        const { id: productId, size } = parsedInput;

        const cookiesClient = await cookies();
        const token = cookiesClient.get("session_token")?.value;

        if (!token) redirect("/login");

        const userData = await getUserByCookies(token);
        if (!userData) redirect("/login");

        const userId = userData.user.id;

        let basketData = await db.query.basket.findFirst({
            where: eq(basket.userId, userId),
        });

        if (!basketData) {
            const [newBasket] = await db
                .insert(basket)
                .values({ userId })
                .returning();

            basketData = newBasket;
        }

        const targetSize = size === "" ? "XS" : size;

        const [existingItem] = await db
            .select()
            .from(basketItems)
            .where(
                and(
                    eq(basketItems.basketId, basketData.id),
                    eq(basketItems.productId, productId),
                    eq(basketItems.sizes, targetSize)
                )
            );

        if (existingItem) {
            const [updatedItem] = await db
                .update(basketItems)
                .set({
                    count: existingItem.count + 1,
                })
                .where(eq(basketItems.id, existingItem.id))
                .returning();

            return { success: true, id: updatedItem.id };
        }

        const [newItem] = await db
            .insert(basketItems)
            .values({
                basketId: basketData.id,
                productId,
                count: 1,
                sizes: targetSize,
            })
            .returning();

        updateTag(`basket-count-${token}`)
        return { success: true, id: newItem.id };
    });