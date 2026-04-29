import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import postgres from "postgres";

dotenv.config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("Missing DATABASE_URL in .env.local");
  process.exit(1);
}

async function runSchema() {
  console.log("Initializing database schema...");
  const sql = postgres(dbUrl);
  
  try {
    const schemaPath = path.join(process.cwd(), "src/lib/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    
    // We split by ';' and execute each part or just run the whole thing if the driver supports it
    // postgres.js supports running the whole block
    await sql.unsafe(schemaSql);
    
    console.log("✅ Database schema initialized successfully!");
  } catch (error: any) {
    console.error("❌ Schema initialization failed:", error.message);
  } finally {
    await sql.end();
  }
}

runSchema();
