import * as SQLite from 'expo-sqlite';
const DB_NAME = 'splashline';

let db: SQLite.SQLiteDatabase | null = null;

export async function openDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME, { useNewConnection: true });
  }
  return db;
}

export async function closeDB() {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}

