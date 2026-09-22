"use server"

import { z } from "zod";
import { actionClient } from "@/shared/lib/safe-actions";
import { cookies } from "next/headers";
import { db } from "@/shared/db/db";
import { eq } from "drizzle-orm";
import { sessions } from "@/entities/user/model/schema";
import { feedbacks } from "@/entities/product/model/schema";

const reviewSchema = z.object({
    title: z.string().min(1, "Review text cannot be empty"),
    productId: z.string().uuid("Invalid product ID format"),
    rate: z.number().default(1),
});

export const reviewDrop = actionClient
    .schema(reviewSchema)
    .action(async ({ parsedInput }) => {
        const { title, productId, rate } = parsedInput;

        const cookiesClient = await cookies();
        const token = cookiesClient.get("session_token");

        if (!token?.value) {
            throw new Error("Unauthorized user");
        }

        const session = await db.query.sessions.findFirst({
            where: eq(sessions.id, token.value),
        });

        if (!session) {
            throw new Error("Session expired or invalid");
        }

        await db
            .insert(feedbacks)
            .values({
                userId: session.userId,
                productId: productId,
                title: title,
                date: new Date(),
                rating: rate,
            });

        return { success: true };
    });