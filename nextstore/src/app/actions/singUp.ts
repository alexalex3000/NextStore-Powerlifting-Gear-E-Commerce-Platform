"use server"

import {z} from "zod";
import {actionClient} from "@/app/lib/safe-action";
import {sessions, users} from "@/db/schema";
import {db} from "@/app/lib/db";
import {eq} from "drizzle-orm";
import {hashPassword} from "@/app/lib/password";
import {randomBytes} from "node:crypto";
import {cookies} from "next/headers";

const signUpSchema = z.object({
    email: z.email(),
    password: z.string().max(20).min(8),
})

export const signUpDrop = actionClient
    .schema(signUpSchema)
    .action(async ({parsedInput}) => {
        const {password, email} = parsedInput;

        const [existingUsers] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))

        if(existingUsers) {
            return {success: false, error: "User with this email already exists" };
        }

        const sessionToken = randomBytes(32).toString("hex");
        const password_hash = await hashPassword(password);

        const [newUser] = await db
            .insert(users)
            .values({
                email,
                passwordHash: password_hash,
            })
            .returning({id: users.id});

        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await db
            .insert(sessions)
            .values({
                id: sessionToken,
                userId: newUser.id,
                expiresAt,
            })

        const cookiesStore = await cookies()
        cookiesStore.set("session_token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/",
        });

        return { success: true };
    })