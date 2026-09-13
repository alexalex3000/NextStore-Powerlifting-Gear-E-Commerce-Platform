import { integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "../../user/model/schema";


export const product = pgTable("product", {
    id: uuid("id").defaultRandom().primaryKey(),
    type: varchar("type").notNull(),
    title: varchar("title").notNull(),
    currentPrice: integer("price").notNull(),
    oldPrice: integer("old_price"),
    count: integer("count").notNull(),
    assessment: integer("assessment").default(0).notNull(),
    numOfFeedbacks: integer("num_of_feedbacks").default(0).notNull(),
    imgUrl: varchar("img_url").notNull(),
});

export const feedbacks = pgTable("feedbacks", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
        .notNull()
        .references(() => product.id, { onDelete: "cascade" }),
    title: varchar("title"),
    date: timestamp("date").defaultNow().notNull(),
});