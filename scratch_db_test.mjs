import { createClient } from "@supabase/supabase-js";

const url = "https://pqspjqilgawtznffwuwu.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxc3BqcWlsZ2F3dHpuZmZ3dXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDY2MDksImV4cCI6MjEwMDIyMjYwOX0.uc578z4PVlb8Hx1lscFkVUDQaBrWeZdvnvsrnEV9jFs";

const supabase = createClient(url, key);

async function testConnection() {
  console.log("📡 Testing connection to Supabase PostgreSQL at:", url);

  try {
    const { data, error } = await supabase.from("customers").select("*").limit(5);

    if (error) {
      console.log("⚠️ Connection reached Supabase, but query notice:", error.message);
      console.log("💡 Tip: If table 'customers' is not created yet, run the SQL script in Supabase SQL Editor.");
    } else {
      console.log("✅ SUCCESS! Supabase Database Connected perfectly!");
      console.log("📊 Customers Table Data:", data);
    }
  } catch (err) {
    console.error("❌ Network or Connection Error:", err.message);
  }
}

testConnection();
