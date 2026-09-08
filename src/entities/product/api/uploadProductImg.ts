"use server"

import {z} from "zod";
import {actionClient} from "@/shared/lib/safe-actions";
import {put} from "@vercel/blob";
import {db} from "@/shared/db/db";
import {product} from "@/entities/product/model/schema";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];


const typeSchema = z.enum(["BELT", "T-SHIRT", "KNEESLEEVES"])

const imageSchema = z
    .custom<File>((val) => val instanceof File, 'Upload file')
    .refine((file) => file.size > 0, 'File will be not empty')
    .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        'Max weight of file — 5 MB'
    )
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Allowed only formats .jpg, .png и .webp'
    );

const productSchema = z.object({
    type: typeSchema,
    title: z.string().nonempty(),
    currentPrice: z.number().positive(),
    count: z.number().positive(),
    file: imageSchema,
})

export const productDrop = actionClient
    .schema(productSchema)
    .action(async ({parsedInput}) => {
        const {type, title, file, currentPrice, count} = parsedInput;

        if(!file){
            throw new Error("Cant upload this image");
        }

        const blob = await put(file.name, file, { access: 'private' });

        if(!blob){
            throw new Error("Cant upload this image");
        }

        const [id] = await db
            .insert(product)
            .values({
                type,
                title,
                currentPrice,
                count,
                imgUrl: blob.url,
            }).returning({id: product.id})

        return id.id;
    })