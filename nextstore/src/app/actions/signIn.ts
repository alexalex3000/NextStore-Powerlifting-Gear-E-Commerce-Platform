"use server"

import {z} from "zod";
import {actionClient} from "@/app/lib/safe-action";
import {db} from "@/app/lib/db";
import {eq} from "drizzle-orm";
import {sessions, users} from "@/db/schema";
import {verifyPassword} from "@/app/lib/password";
import {randomBytes} from "node:crypto";
import {cookies} from "next/headers";

const signSchema = z.object({
    email: z.email(),
    password: z.string().max(20).min(8),
})

export const signInDrop = actionClient
    .schema(signSchema)
    .action(async ({parsedInput}) => {
        const {email, password} = parsedInput;

        const [isUserExist] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if(!isUserExist) {
            return ({error: "Invalid email"});
        }

        const isValidPassword = await verifyPassword(isUserExist.passwordHash, password);

        if(!isValidPassword) {
            return ({success: false, error: "Invalid password"});
        }

        const sessionToken = randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 дней

        await db.insert(sessions).values({
            id: sessionToken,
            userId: isUserExist.id,
            expiresAt,
        });

        const cookieStore = await cookies();
        cookieStore.set("session_token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/",
        });

        return { success: true };
    })