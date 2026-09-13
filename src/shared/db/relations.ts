import { relations } from "drizzle-orm";
import {users, sessions, basket, basketItems} from "../../entities/user/model/schema";
import { product, feedbacks } from "../../entities/product/model/schema";
import { orders, orderItems } from "../../entities/order/model/schema";

export const usersRelations = relations(users, ({ one, many }) => ({
    sessions: many(sessions),
    orders: many(orders),
    feedbacks: many(feedbacks),
    basket: one(basket),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const productRelations = relations(product, ({ many }) => ({
    feedbacks: many(feedbacks),
    orderItems: many(orderItems),
    basketItems: many(basketItems),
}));

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
    product: one(product, {
        fields: [feedbacks.productId],
        references: [product.id],
    }),
    user: one(users, {
        fields: [feedbacks.userId],
        references: [users.id],
    }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    product: one(product, {
        fields: [orderItems.productId],
        references: [product.id],
    }),
}));

export const basketRelations = relations(basket, ({one, many}) => ({
    user: one(users, {
        fields: [basket.userId],
        references: [users.id],
    }),
    basketItems: many(basketItems),
}))

export const basketItemsRelations = relations(basketItems, ({ one }) => ({
    basket: one(basket, {
        fields: [basketItems.basketId],
        references: [basket.id],
    }),
    product: one(product, {
        fields: [basketItems.productId],
        references: [product.id],
    })
}))
