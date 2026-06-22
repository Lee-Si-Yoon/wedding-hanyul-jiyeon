import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const sideEnum = pgEnum('side', ['groom', 'bride']);
export const mealEnum = pgEnum('meal', ['yes', 'no', 'undecided']);

export const adminCredentials = pgTable('admin_credentials', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
});

export const uiFlags = pgTable('ui_flags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  enabled: boolean('enabled').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const rsvp = pgTable('rsvp', {
  id: serial('id').primaryKey(),
  side: sideEnum('side').notNull(),
  name: text('name').notNull(),
  meal: mealEnum('meal').notNull(),
  count: integer('count').notNull().default(1),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export type InsertAdminCredentials = typeof adminCredentials.$inferInsert;
export type SelectAdminCredentials = typeof adminCredentials.$inferSelect;

export type InsertUiFlag = typeof uiFlags.$inferInsert;
export type SelectUiFlag = typeof uiFlags.$inferSelect;

export type InsertRsvp = typeof rsvp.$inferInsert;
export type SelectRsvp = typeof rsvp.$inferSelect;
