import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '@/env';

const sqlite = new Database(env.DATABASE_URL);
const db = drizzle(sqlite);

export default db;