import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { tasks } from "@/db/schema";
// todo: add i18n support for validation messages
export const selectTasksSchema = createSelectSchema(tasks);
export const insertTasksSchema = createInsertSchema(tasks, {
  name: z.string().min(5).max(255),
  done: z.boolean(),
}).omit({
  createdAt: true,
  updatedAt: true,
});
export const patchTasksSchema = insertTasksSchema.partial();

export type CreateTaskDTO = z.infer<typeof insertTasksSchema>;
export type UpdateTaskDTO = z.infer<typeof patchTasksSchema>;
