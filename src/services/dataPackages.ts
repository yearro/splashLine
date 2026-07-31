import { openDatabase } from "./db";

export async function createPackage(name: string, description: string, services: number[], icon: string = 'local-car-wash') {
  const db = await openDatabase();
  const result = await db.runAsync("INSERT INTO packages (name, description, icon) VALUES (?, ?, ?)", [name, description, icon]);
  const packageId = result.lastInsertRowId;
  if (services.length > 0) {
    services.forEach((serviceId) => {
      db.runAsync("INSERT INTO package_services (package_id, service_id) VALUES (?, ?)", [packageId, serviceId]);
    });
  }
  return packageId;
}

export async function updatePackage(id: number, name: string, description: string, services: number[], icon: string = 'local-car-wash') {
  const db = await openDatabase();
  await db.runAsync("UPDATE packages SET name = ?, description = ?, icon = ? WHERE id = ?", [name, description, icon, id]);
  await db.runAsync("DELETE FROM package_services WHERE package_id = ?", [id]);
  services.forEach((serviceId) => {
    db.runAsync("INSERT INTO package_services (package_id, service_id) VALUES (?, ?)", [id, serviceId]);
  });
  return id;
}

export async function deletePackage(id: number) {
  const db = await openDatabase();
  await db.runAsync("DELETE FROM packages WHERE id = ?", [id]);
  await db.runAsync("DELETE FROM package_services WHERE package_id = ?", [id]);
}

export async function getAllPackages() {
  const db = await openDatabase();
  const packages = await db.getAllAsync("SELECT * FROM packages");
  const packageServices = await db.getAllAsync("SELECT * FROM package_services");
  return packages.map((p: any) => {
    const services = packageServices.filter((ps: any) => ps.package_id === p.id);
    return { ...p, serviceIds: services.map((ps: any) => ps.service_id) };
  });
}