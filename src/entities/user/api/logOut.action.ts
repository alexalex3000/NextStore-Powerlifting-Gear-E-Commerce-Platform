"use server";

import { cookies } from "next/headers";
import { db } from "@/shared/db/db";
import { sessions } from "@/entities/user/model/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function logOutAction() {
    const cookiesClient = await cookies();
    const token = cookiesClient.get("session_token")?.value;

    if (token) {
        try {
            await db.delete(sessions).where(eq(sessions.id, token));
        } catch (error) {
            return {success: false, error: "Could not delete session"};
        }
    }

    cookiesClient.delete("session_token");

    revalidatePath("/", "layout");

    redirect("/login");
}