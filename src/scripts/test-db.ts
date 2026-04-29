import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log("Connecting to:", supabaseUrl);
  const { data, error } = await supabase.from("inquiries").select("*").limit(1);
  
  if (error) {
    console.error("Connection failed:", error.message);
  } else {
    console.log("Successfully connected to Supabase!");
    console.log("Current inquiries in DB:", data.length);
  }
}

testConnection();
