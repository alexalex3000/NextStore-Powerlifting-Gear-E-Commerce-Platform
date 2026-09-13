"use server";

import { z } from "zod";
import { actionClient } from "@/shared/lib/safe-actions";
import { db } from "@/shared/db/db";
import { basketItems } from "@/entities/user/model/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getUserByCookies from "@/shared/lib/getUserByCookies";

const changeCountSchema = z.object({
    id: z.string().nonempty(),
    type: z.enum(["inc", "dec"]),
});

export const changeCountDrop = actionClient
    .schema(changeCountSchema)
    .action(async ({ parsedInput }) => {
        const { id, type } = parsedInput;

        const cookiesClient = await cookies();
        const token = cookiesClient.get("session_token")?.value;

        if (!token) redirect("/login");

        const userData = await getUserByCookies(token);
        if (!userData) redirect("/login");

        const [item] = await db
            .select()
            .from(basketItems)
            .where(eq(basketItems.id, id));

        if (!item) {
            throw new Error("Basket item not found");
        }

        if (type === "inc") {
            await db
                .update(basketItems)
                .set({ count: item.count + 1 })
                .where(eq(basketItems.id, id));
        } else {
            if (item.count <= 1) {
                await db
                    .delete(basketItems)
                    .where(eq(basketItems.id, id));
            } else {
                await db
                    .update(basketItems)
                    .set({ count: item.count - 1 })
                    .where(eq(basketItems.id, id));
            }
        }

        return { success: true };
    });