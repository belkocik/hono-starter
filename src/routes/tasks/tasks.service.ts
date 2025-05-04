import { eq } from "drizzle-orm";

import db from "@/db";
import { tasks } from "@/db/schema";

import type { CreateTaskDTO, UpdateTaskDTO } from "./tasks.schemas";

export async function listTasks() {
  return db.query.tasks.findMany();
}

export async function createTask(task: CreateTaskDTO) {
  const [inserted] = await db.insert(tasks).values(task).returning();
  return inserted;
}

export async function getTaskById(id: number) {
  return db.query.tasks.findFirst({ where: eq(tasks.id, id) });
}

export async function updateTask(id: number, updates: UpdateTaskDTO) {
  const [updatedTask] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
  return updatedTask;
}

export async function deleteTask(id: number) {
  return db.delete(tasks).where(eq(tasks.id, id)).returning();
}
