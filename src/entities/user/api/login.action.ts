"use server"

import {z} from "zod";
import {actionClient} from "@/shared/lib/safe-actions";
import {db} from "@/shared/db/db";
import {sessions, users} from "@/entities/user/model/schema";
import {eq} from "drizzle-orm";
import {passwordVerify} from "@/shared/lib/password";
import {randomBytes} from "node:crypto";
import {cookies} from "next/headers";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const loginDrop = actionClient
    .schema(loginSchema)
    .action(async ({parsedInput}) => {
        const { email, password } = parsedInput;

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))

        if(!user){
            return {success: false, message: "Check your email or password"};
        }

        const isValidPassword = await passwordVerify(password, user.passwordHash)


        if(!isValidPassword){
            return {success: false, message: "Check your email or password"};
        }

        const sessionToken = randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const [result] = await db
            .insert(sessions)
            .values({
                id: sessionToken,
                userId: user.id,
                expiresAt
            })
            .returning()

        if(!result){
            return {success: false, message: "Cant login this user"};
        }

        const cookiesClient = await cookies()
        cookiesClient.set("session_token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })

        return {success: true};
    })