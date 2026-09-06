"use server"

import {z} from "zod";
import {actionClient} from "@/shared/lib/safe-actions";
import {db} from "@/shared/db/db";
import {sessions, users} from "@/entities/user/model/schema";
import {eq} from "drizzle-orm";
import {hashPassword} from "@/shared/lib/password";
import {cookies} from "next/headers";
import {randomBytes} from "node:crypto";

const registerSchema = z.object({
    name: z.string().nonempty(),
    surname: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
})

export const registerDrop = actionClient
    .schema(registerSchema)
    .action(async ({parsedInput}) => {
        const {name, surname, email, password, password_confirmation} = parsedInput;

        if(password != password_confirmation) {
            return {success: false, message: "Passwords don't match"};
        }

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))

        if(user){
            return {success: false, message: "User with this email already exists"};
        }

        const hashed = await hashPassword(password);

        const [result] = await db
            .insert(users)
            .values({
                firstName: name,
                lastName: surname,
                email,
                passwordHash: hashed,
            })
            .returning()

        if(!result){
            return {success: false, message: "Server error. Cant register this user"};
        }

        const sessionToken = randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);


        const [session] = await db
            .insert(sessions)
            .values({
                id: sessionToken,
                userId: result.id,
                expiresAt,
            })
            .returning()

        if(!session){
            await db
                .delete(users)
                .where(eq(users.email, email))

            return {success: false, message: "Server error. Cant register this user"};
        }

        const cookiesClient = await cookies()
        cookiesClient.set("session_token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })

        return {success: true}
    })