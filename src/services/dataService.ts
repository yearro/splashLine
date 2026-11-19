import { openDatabase } from "./db";
import { ServiceHistory, TopNumbers } from "./types";

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
  `, [name, price, description, Number(id)]);
  return Number(id);
}

export async function deleteService(id: number) {
  const db = await openDatabase();
  const result = await db.runAsync(`
    DELETE FROM services WHERE id = ?
  `, [id]);
  return result.changes;
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
export async function getTotalNumbers() {
  const db = await openDatabase();
  const result = await db.getFirstAsync<TopNumbers>(`SELECT
      COUNT(*) AS total_servicios,
      SUM(price) AS total_ingresos,
      AVG(time_service) AS tiempo_total_minutos
    FROM service_history;`,
    []);
  return result;
}

export async function getAllServiceHistory(year: number) {
  const db = await openDatabase();
  const result = await db.getAllAsync<ServiceHistory>(`SELECT price, date FROM service_history WHERE strftime('%Y', date) = ?;`, [`${year}`]);
  return result;
}

export async function addHistoryService(time_service: number, price: number) {
  const db = await openDatabase();
  const result = await db.runAsync(`
    INSERT INTO service_history (date, price, time_service) VALUES (?, ?, ?)
  `, [new Date().toISOString(), price, time_service]);
  return result.lastInsertRowId;
}

export async function seedHistory() {
  const db = await openDatabase();

  const records = [
    '2024-01-12T22:07:33.390Z', '2024-01-20T22:07:33.390Z', '2024-02-10T22:07:33.390Z',
    '2024-02-25T22:07:33.390Z', '2024-03-05T22:07:33.390Z', '2024-03-15T22:07:33.390Z',
    '2024-04-01T22:07:33.390Z', '2024-04-20T22:07:33.390Z', '2024-05-05T22:07:33.390Z',
    '2024-05-25T22:07:33.390Z', '2024-06-10T22:07:33.390Z', '2024-06-20T22:07:33.390Z',
    '2024-07-01T22:07:33.390Z', '2024-07-15T22:07:33.390Z', '2024-08-05T22:07:33.390Z',
    '2024-08-20T22:07:33.390Z', '2024-09-10T22:07:33.390Z', '2024-09-20T22:07:33.390Z',
    '2024-10-01T22:07:33.390Z', '2024-10-15T22:07:33.390Z', '2024-11-05T22:07:33.390Z',
    '2024-11-20T22:07:33.390Z', '2024-12-10T22:07:33.390Z', '2024-12-20T22:07:33.390Z',
    '2025-01-15T22:07:33.390Z', '2025-01-20T22:07:33.390Z', '2025-02-10T22:07:33.390Z',
    '2025-02-25T22:07:33.390Z', '2025-03-05T22:07:33.390Z', '2025-03-15T22:07:33.390Z',
    '2025-02-25T22:07:33.390Z', '2025-03-05T22:07:33.390Z', '2025-03-15T22:07:33.390Z',
    '2025-02-25T22:07:33.390Z', '2025-03-05T22:07:33.390Z', '2025-03-15T22:07:33.390Z',
    '2025-04-01T22:07:33.390Z', '2025-04-20T22:07:33.390Z', '2025-05-05T22:07:33.390Z',
    '2025-05-25T22:07:33.390Z', '2025-06-10T22:07:33.390Z', '2025-06-20T22:07:33.390Z',
    '2025-07-01T22:07:33.390Z', '2025-07-15T22:07:33.390Z', '2025-08-05T22:07:33.390Z',
    '2025-08-20T22:07:33.390Z', '2025-09-10T22:07:33.390Z', '2025-09-20T22:07:33.390Z',
    '2025-10-01T22:07:33.390Z', '2025-10-15T22:07:33.390Z', '2025-11-05T22:07:33.390Z',
    '2025-11-20T22:07:33.390Z', '2025-12-10T22:07:33.390Z', '2025-12-20T22:07:33.390Z',
    '2026-01-15T22:07:33.390Z', '2026-01-20T22:07:33.390Z', '2026-02-10T22:07:33.390Z',
    '2026-02-25T22:07:33.390Z', '2026-03-05T22:07:33.390Z', '2026-03-15T22:07:33.390Z',
    '2026-01-15T22:07:33.390Z', '2026-01-20T22:07:33.390Z', '2026-02-10T22:07:33.390Z',
    '2026-01-15T22:07:33.390Z', '2026-01-20T22:07:33.390Z', '2026-02-10T22:07:33.390Z',
    '2026-01-15T22:07:33.390Z', '2026-01-20T22:07:33.390Z', '2026-02-10T22:07:33.390Z',
    '2026-01-15T22:07:33.390Z', '2026-01-20T22:07:33.390Z', '2026-02-10T22:07:33.390Z',
    '2026-04-01T22:07:33.390Z', '2026-04-20T22:07:33.390Z', '2026-05-05T22:07:33.390Z',
    '2026-05-25T22:07:33.390Z', '2026-06-10T22:07:33.390Z', '2026-06-20T22:07:33.390Z',
    '2026-05-25T22:07:33.390Z', '2026-06-10T22:07:33.390Z', '2026-06-20T22:07:33.390Z',
    '2026-07-01T22:07:33.390Z', '2026-07-15T22:07:33.390Z', '2026-08-05T22:07:33.390Z',
    '2026-08-20T22:07:33.390Z', '2026-09-10T22:07:33.390Z', '2026-09-20T22:07:33.390Z',
    '2026-10-01T22:07:33.390Z', '2026-10-15T22:07:33.390Z', '2026-11-05T22:07:33.390Z',
    '2026-11-20T22:07:33.390Z', '2026-12-10T22:07:33.390Z', '2026-12-20T22:07:33.390Z',
  ];
  try {
    await db.withExclusiveTransactionAsync(async (txn) => {
      await txn.runAsync('DELETE FROM service_history;');

      const placeholders = records.map(() => '(?, ?, ?)').join(', ');
      const values = records.flatMap(date => [date, 250, 30]);

      await txn.runAsync(
        `INSERT INTO service_history (date, price, time_service) VALUES ${placeholders};`,
        values
      );
    });
    return true
  } catch (error) {
    console.error('Error al insertar el historial:', error);
    throw error;
  }
}