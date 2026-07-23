import { createClient } from "@supabase/supabase-js";

// Supabase URL and Anon Key from environment variables with safe fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xyz-nsv-milk.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummykey";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabaseCustomer {
  id?: string;
  full_name: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  house_no?: string;
  village?: string;
  mandal?: string;
  district?: string;
  pincode?: string;
  gps_lat?: number | null;
  gps_lng?: number | null;
  order_type?: string;
  selected_plan_id?: string;
  selected_product_id?: string;
  delivery_slot?: string;
  status?: string;
  registered_at?: string;
}

export interface SupabaseWalletTx {
  id?: string;
  user_mobile: string;
  type: string;
  title: string;
  amount: number;
  status: string;
  created_at?: string;
}
