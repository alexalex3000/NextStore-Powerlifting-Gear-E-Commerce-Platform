"use server"

import {z} from "zod";
import {actionClient} from "@/shared/lib/safe-actions";
import {put} from "@vercel/blob";
import {db} from "@/shared/db/db";
import {users} from "@/entities/user/model/schema";
import {revalidatePath} from "next/cache";

const logoSchema = z.object({
    file: z.file()
})

export const logoDrop = actionClient
    .schema(logoSchema)
    .action(async ({parsedInput}) => {
        const {file} = parsedInput;

        if(!file){
            throw new Error("Cant upload this image");
        }

        const blob = await put(file.name, file, { access: 'public' });

        if(!blob){
            throw new Error("Cant upload this image");
        }

        const [id] = await db
            .update(users)
            .set({
                logoUrl: blob.url,
            })
            .returning({id: users.id})

        revalidatePath("/shop/profile/")
        return id.id;
    })