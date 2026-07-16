import { openDatabase } from "./db";

export async function createAppTables() {
  const db = await openDatabase();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT
    );
    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT
    );
    CREATE TABLE IF NOT EXISTS package_services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      package_id INTEGER,
      service_id INTEGER,
      FOREIGN KEY (package_id) REFERENCES packages(id),
      FOREIGN KEY (service_id) REFERENCES services(id)
    );
    CREATE TABLE IF NOT EXISTS service_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE DEFAULT current_date,
      price REAL,
      time_service INTEGER
    );
  `)
}