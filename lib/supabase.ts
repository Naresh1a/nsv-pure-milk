import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://pqspjqilgawtznffwuwu.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxc3BqcWlsZ2F3dHpuZmZ3dXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDY2MDksImV4cCI6MjEwMDIyMjYwOX0.uc578z4PVlb8Hx1lscFkVUDQaBrWeZdvnvsrnEV9jFs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);