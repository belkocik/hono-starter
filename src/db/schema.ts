import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tasks = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  done: boolean("done").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()),
});

export const selectTasksSchema = createSelectSchema(tasks);
export const insertTasksSchema = createInsertSchema(tasks, {
  name: schema => schema.min(5).max(255),
}).required({
  done: true,
}).omit({
  createdAt: true,
  updatedAt: true,
});
// export const patchTasksSchema = createUpdateSchema(tasks); // got to omit values that are not updatable or just use insertTasksSchema with .partial()?
export const patchTasksSchema = insertTasksSchema.partial();
