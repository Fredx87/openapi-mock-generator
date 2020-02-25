import { IDBPDatabase } from "idb";
import { useContext } from "react";
import { DbContext, MyDb } from "src/database/database";

export function useDatabase(): IDBPDatabase<MyDb> {
  const db = useContext(DbContext);

  if (db === undefined) {
    throw new Error("Database connection not set");
  }

  return db;
}
