import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";

export const posts = pgTable('posts', {
    id:integer('id').primaryKey().generatedAlwaysAsIdentity(),
    title:text('title').notNull(),
    content:text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
});