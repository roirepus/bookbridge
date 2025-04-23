import { varchar, uuid, integer, pgTable, text, pgEnum, timestamp, date } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"])
export const roleEnum = pgEnum("role", ["USER", "ADMIN"])
export const borrowStatusEnum = pgEnum("borrowStatus", ["BORROWED", "RETURNED"])

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("universityId").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("universityCard").notNull(),
  status: statusEnum("status").default("PENDING"),
  role: roleEnum("role").default("USER"),
  lastActivityDate: date("lastActivityDate").defaultNow(),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
  }).defaultNow(),
})
