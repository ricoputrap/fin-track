import { integer, real, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  created_at: integer('created_at')
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  type: integer("type").notNull(), // 0: income, 1: expense
  userId: integer("user_id").references(() => users.id).notNull(),
  created_at: integer('created_at')
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
});

export const wallets = sqliteTable("wallets", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  balance: real("balance").notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  created_at: integer('created_at')
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
});

export const savings = sqliteTable("savings", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  targetAmount: real("amount").notNull(),
  currentAmount: real("amount").notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  created_at: integer('created_at')
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
});

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey(),
  amount: real("amount").notNull(),
  date: integer("date").notNull(), // unix timestamp in seconds
  description: text("description"),
  userId: integer("user_id").references(() => users.id).notNull(),
  created_at: integer('created_at')
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
});

export const incomeExpenseTransactions = sqliteTable("income_expense_transactions", {
  id: integer("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => transactions.id).notNull(),
  categoryId: integer("category_id").references(() => categories.id).notNull(),
  walletId: integer("wallet_id").references(() => wallets.id).notNull(),
  created_at: integer('created_at')
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
});

export const transferTransactions = sqliteTable("transfer_transactions", {
  id: integer("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => transactions.id).notNull(),
  sourceWalletId: integer("from_wallet_id").references(() => wallets.id).notNull(),
  targetWalletId: integer("to_wallet_id").references(() => wallets.id).notNull(),
  created_at: integer('created_at')
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
});

export const savingTransactions = sqliteTable("saving_transactions", {
  id: integer("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => transactions.id).notNull(),
  walletId: integer("wallet_id").references(() => wallets.id).notNull(),
  savingId: integer("saving_id").references(() => savings.id).notNull(),
  created_at: integer('created_at')
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Math.floor(new Date().getTime() / 1000)), // unix timestamp in seconds
});