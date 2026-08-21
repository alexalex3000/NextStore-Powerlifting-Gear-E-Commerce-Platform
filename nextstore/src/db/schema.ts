import {integer, pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email").unique().notNull(),
    passwordHash: varchar("password_hash").notNull(),
})

export const sessions = pgTable("sessions", {
    id: varchar("id").primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
})

export const usersRelations = relations(users, ({many}) => ({
    user: many(sessions),
}))

export const sessionsRelations = relations(sessions, ({one}) => ({
    sessions: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}))

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