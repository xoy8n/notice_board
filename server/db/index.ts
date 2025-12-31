import Pg from "pg";
import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";

const {Pool} = Pg;

if(!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
}); 

const db = drizzle(pool);

export default db;