import {defineConfig} from "drizzle-kit";
import "dotenv/config"

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
    dialect: "postgresql"
})