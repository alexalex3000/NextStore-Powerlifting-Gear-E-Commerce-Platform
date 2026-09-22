import { integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import {sizesEnum, users} from "../../user/model/schema";
import { product } from "../../product/model/schema";

export const orderStatusEnum = pgEnum("order_status", [
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
]);

export const orders = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    status: orderStatusEnum("status").default("pending").notNull(),
    shippingCountry: varchar("shipping_country", { length: 500 }).notNull(),
    shippingCity: varchar("shipping_city", { length: 500 }).notNull(),
    shippingAddress: varchar("shipping_address", { length: 500 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const orderItems = pgTable("order_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
        .references(() => product.id, { onDelete: "set null" }),
    size: sizesEnum("size"),
    count: integer("count").notNull(),
});