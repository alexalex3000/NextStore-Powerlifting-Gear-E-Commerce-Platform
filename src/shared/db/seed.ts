import { config } from "dotenv";
config({ path: ".env" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { product } from "@/entities/product/model/schema";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL не найден в .env");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const productsData = [
    {
        type: "BELT",
        title: "IPF BELT 13mm Green v1",
        currentPrice: 499,
        count: 904,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/pojas-13-mm-resolve-reshenie.jpg"
    },
    {
        type: "KNEESLEEVES",
        title: "SBD Kneesleeves Pink",
        currentPrice: 189,
        count: 741,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/nakolenniki-dlja-pauyerliftinga-nova.jpg"
    },
    {
        type: "BELT",
        title: "IPF BELT 13mm Classic",
        currentPrice: 499,
        count: 498,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/pojas-sbd-10mm.jpg"
    },
    {
        type: "KNEESLEEVES",
        title: "SBD Kneesleeves Grey",
        currentPrice: 189,
        count: 412,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/nakolenniki-dlja-pauyerliftinga-7mm-serye-forge.jpg"
    },
    {
        type: "KNEESLEEVES",
        title: "SBD Kneesleeves Blue",
        currentPrice: 189,
        count: 10,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/nakolenniki-dlja-pauyerliftinga-reflect.jpg"
    },
    {
        type: "T-SHIRT",
        title: "SBD T-Shirt Blue",
        currentPrice: 99,
        count: 812,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/maika-reflect.jpg"
    },
    {
        type: "T-SHIRT",
        title: "SBD T-Shirt Classic",
        currentPrice: 99,
        count: 412,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/maika-sbd.jpg"
    },
    {
        type: "BELT",
        title: "IPF BELT 13mm Green v2",
        currentPrice: 499,
        count: 213,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/pojas-10-mm-resolve-reshenie.jpg"
    },
    {
        type: "KNEESLEEVES",
        title: "SBD Kneesleeves Orange",
        currentPrice: 189,
        count: 523,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/nakolenniki-dlja-pauyerliftinga-7mm-oranzhevye-forge.jpg"
    },
    {
        type: "T-SHIRT",
        title: "SBD T-Shirt Purple",
        currentPrice: 99,
        count: 215,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/maika-aspire-stremlenie.jpg"
    },
    {
        type: "KNEESLEEVES",
        title: "SBD Kneesleeves Classic",
        currentPrice: 189,
        count: 751,
        imgUrl: "https://kblry4urnqepphpz.public.blob.vercel-storage.com/nakolenniki-dlja-pauyerliftinga.jpg"
    }
];

async function seed() {
    try {
        console.log("seeding...");
        await db.insert(product).values(productsData);
        process.exit(0);
    } catch (error) {
        process.exit(1);
    }
}

seed();