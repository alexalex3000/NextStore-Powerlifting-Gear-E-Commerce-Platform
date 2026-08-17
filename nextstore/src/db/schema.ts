import {integer, pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const product = pgTable("product", {
    id: uuid("id").defaultRandom().primaryKey(),
    type: varchar("type").notNull(),
    title: varchar("title"),
    currentPrice: integer("price").notNull(),
    oldPrice: integer("old_price"),
    assestment: integer("assestment"),
    numOfFeedbacks: integer("num_of_feedbacks"),
})

export const feedback = pgTable("feedback", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title"),
    date: timestamp("date").notNull(),
    productId: uuid("product_id").references(() => product.id),
})

export const productRelations = relations(product, ({many}) => ({
    product: many(feedback),
}))

export const feedbackRelations = relations(feedback, ({one}) => ({
    feedback: one(product, {
        fields: [feedback.productId],
        references: [product.id],
    }),
}))