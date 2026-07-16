import { openDatabase } from "./db";

export async function createService(name: string, price: number, description: string) {
  const db = await openDatabase();
  const result = await db.runAsync(`
    INSERT INTO services (name, price, description) VALUES (?, ?, ?)
  `, [name, price, description]);
  return result.lastInsertRowId;
}

export async function createServiceHistory(date: string, price: number, time_service: number) {
  const db = await openDatabase();
  const result = await db.runAsync(`
    INSERT INTO service_history (date, price, time_service) VALUES (?, ?, ?)
  `, [date, price, time_service]);
  return result.lastInsertRowId;
}