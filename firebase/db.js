import { getDatabase, ref, set, get, update, remove } from "firebase/database";
import { app } from "./config"; // your Firebase initialized app

const db = getDatabase(app);

// WRITE
export async function writeData(path, value) {
  await set(ref(db, path), value);
}

// READ
export async function readData(path) {
  const snapshot = await get(ref(db, path));
  return snapshot.exists() ? snapshot.val() : null;
}

// UPDATE
export async function updateData(path, value) {
  await update(ref(db, path), value);
}

// DELETE
export async function deleteData(path) {
  await remove(ref(db, path));
}
