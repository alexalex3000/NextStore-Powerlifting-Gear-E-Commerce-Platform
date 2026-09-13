import {integer, pgEnum, pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {product} from "@/entities/product/model/schema";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const sizesEnum = pgEnum("sizes", ["XS", "S", "M", "L", "XL", "XXL"]);


export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    role: roleEnum('role').default('user').notNull(),
    email: varchar("email").unique().notNull(),
    passwordHash: varchar("password_hash").notNull(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    phoneNumber: varchar("phone_number"),
    logoUrl: varchar("logo_url"),
});

export const sessions = pgTable("sessions", {
    id: varchar("id").primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
});


export const basket = pgTable("basket", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
   });

export const basketItems = pgTable("basket_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    basketId: uuid("basket_id")
        .notNull()
        .references(() => basket.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
        .references(() => product.id, { onDelete: "set null" }),
    sizes: sizesEnum("size"),
    count: integer("count").notNull(),
});


