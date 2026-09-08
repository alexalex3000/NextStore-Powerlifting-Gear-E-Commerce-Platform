import {db} from "@/shared/db/db";
import {eq} from "drizzle-orm";
import {sessions} from "@/entities/user/model/schema";

export default async function getUserByCookies(token: string ) {
    const user = await db
        .query
        .sessions
        .findFirst({
            where: eq(sessions.id, token),
            with: {
                user: true
            }
        })

    return user
}