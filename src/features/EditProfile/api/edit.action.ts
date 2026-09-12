"use server"

import { z } from "zod";
import { actionClient } from "@/shared/lib/safe-actions";
import { db } from "@/shared/db/db";
import { users } from "@/entities/user/model/schema";
import { cookies } from "next/headers";
import getUserByCookies from "@/shared/lib/getUserByCookies";
import { eq } from "drizzle-orm";
import {revalidatePath} from "next/cache";

const editSchema = z.object({
    firstName: z.string().min(1, "First name is necessary"),
    lastName: z.string().min(1, "Last name is necessary"),
    phoneNumber: z.string().optional(),
    email: z.string().email("Invalid email").min(1, "Email is necessary"),
});

export const editDrop = actionClient
    .schema(editSchema)
    .action(async ({ parsedInput }) => {
        const { firstName, lastName, phoneNumber, email } = parsedInput;

        const cookiesClient = await cookies();
        const token = cookiesClient.get("session_token")?.value;

        if (!token) {
            throw new Error("Cookie not found");
        }

        const userData = await getUserByCookies(token);

        if (!userData) {
            throw new Error("User not found");
        }

        await db
            .update(users)
            .set({
                firstName,
                lastName,
                phoneNumber,
                email,
            })
            .where(eq(users.id, userData.user.id));

        revalidatePath("/")

        return {
            success: true,
        };
    });