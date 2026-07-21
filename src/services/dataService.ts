import { openDatabase } from "./db";

export async function createService(name: string, price: number, description: string) {
  const db = await openDatabase();
  const result = await db.runAsync(`
    INSERT INTO services (name, price, description) VALUES (?, ?, ?)
  `, [name, price, description]);
  return result.lastInsertRowId;
}

export async function updateService(id: number, name: string, price: number, description: string) {
  const db = await openDatabase();
  const result = await db.runAsync(`
    UPDATE services SET name = ?, price = ?, description = ? WHERE id = ?
  `, [name, price, description, id]);
  return result.lastInsertRowId;
}

export async function deleteService(id: number) {
  const db = await openDatabase();
  const result = await db.runAsync(`
    DELETE FROM services WHERE id = ?
  `, [id]);
  return result.lastInsertRowId;
}

export async function getAllServices() {
  const db = await openDatabase();
  const result = await db.getAllAsync('SELECT * FROM services');
  return result;
}

export async function getServiceById(id: number) {
  const db = await openDatabase();
  const result = await db.getFirstAsync('SELECT * FROM services WHERE id = ?', [id]);
  return result;
}

export async function createServiceHistory(date: string, price: number, time_service: number) {
  const db = await openDatabase();
  const result = await db.runAsync(`
    INSERT INTO service_history (date, price, time_service) VALUES (?, ?, ?)
  `, [date, price, time_service]);
  return result.lastInsertRowId;
}