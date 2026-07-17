import { mkdir, appendFile } from "node:fs/promises";
import { dirname } from "node:path";

export type LeadRecord = {
  name: string;
  email: string;
  company?: string;
  budget_range?: string;
  message: string;
  ip?: string;
  ua?: string;
  created_at: string;
};

// Lazily initialized SQLite handle. Loaded via variable specifier so the
// bundler cannot statically resolve better-sqlite3 (which is optional and
// only installed on the VPS Node runtime).
let dbPromise: Promise<{ insert: (r: LeadRecord) => void } | null> | null = null;

async function getDb() {
  if (dbPromise) return dbPromise;
  dbPromise = (async () => {
    if (process.env.LEADS_BACKEND && process.env.LEADS_BACKEND !== "sqlite") {
      return null;
    }
    try {
      const modName = "better-sqlite3";
      const mod: any = await import(/* @vite-ignore */ modName);
      const Database = mod.default || mod;
      const path = process.env.LEADS_DB_PATH || "./data/leads.db";
      await mkdir(dirname(path), { recursive: true }).catch(() => {});
      const db = new Database(path);
      db.pragma("journal_mode = WAL");
      db.exec(`CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        budget_range TEXT,
        message TEXT NOT NULL,
        ip TEXT,
        ua TEXT,
        created_at TEXT NOT NULL
      );`);
      const stmt = db.prepare(
        `INSERT INTO leads (name,email,company,budget_range,message,ip,ua,created_at)
         VALUES (@name,@email,@company,@budget_range,@message,@ip,@ua,@created_at)`,
      );
      return {
        insert: (r: LeadRecord) =>
          stmt.run({
            company: "",
            budget_range: "",
            ip: "",
            ua: "",
            ...r,
          }),
      };
    } catch {
      return null;
    }
  })();
  return dbPromise;
}

async function appendJsonl(record: LeadRecord) {
  const path = process.env.LEADS_JSONL_PATH || "./data/leads.jsonl";
  await mkdir(dirname(path), { recursive: true }).catch(() => {});
  await appendFile(path, JSON.stringify(record) + "\n", "utf8");
}

export async function saveLead(record: LeadRecord) {
  const db = await getDb();
  if (db) {
    db.insert(record);
    return;
  }
  await appendJsonl(record);
}