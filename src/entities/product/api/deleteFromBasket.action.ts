"use server";

import { z } from "zod";
import { actionClient } from "@/shared/lib/safe-actions";
import { db } from "@/shared/db/db";
import { basketItems } from "@/entities/user/model/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getUserByCookies from "@/shared/lib/getUserByCookies";
import {revalidatePath} from "next/cache";

const deleteFromBasketSchema = z.object({
    id: z.string().nonempty(),
});

export const deleteFromBasketDrop = actionClient
    .schema(deleteFromBasketSchema)
    .action(async ({ parsedInput }) => {
        const { id } = parsedInput;

        const cookiesClient = await cookies();
        const token = cookiesClient.get("session_token")?.value;

        if (!token) redirect("/login");

        const userData = await getUserByCookies(token);
        if (!userData) redirect("/login");

        await db
            .delete(basketItems)
            .where(eq(basketItems.id, id));

        revalidatePath("/shop/basket")
        return { success: true };
    });