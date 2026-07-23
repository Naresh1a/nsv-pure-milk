import { supabase, SupabaseCustomer } from "./supabaseClient";

export interface CustomerRegistration {
  id?: string;
  fullName: string;
  mobile: string;
  whatsapp: string;
  email?: string;
  houseNo: string;
  buildingName?: string;
  streetLane?: string;
  locality: string;
  city: string;
  pincode: string;
  landmark?: string;
  gpsLat?: number | null;
  gpsLng?: number | null;
  gpsAddress?: string;
  gpsAccuracy?: number | null;
  orderType: "subscription" | "trial" | "bulk";
  selectedPlanId: string;
  selectedProductId: string;
  milkType: "cow" | "buffalo" | "a2";
  deliverySlot: string;
  startDate: string;
  specialInstructions?: string;
  registeredAt: string;
  status: "pending" | "confirmed" | "delivered" | "active";
}

const STORAGE_KEY = "nsv_customer_registrations";

export function getRegistrations(): CustomerRegistration[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearAllDevRegistrations() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("nsv_logged_in_user");
  }
}

export function saveRegistration(reg: Omit<CustomerRegistration, "id">): string {
  const newId = `NSV-${Date.now()}`;
  const record: CustomerRegistration = { ...reg, id: newId };

  if (typeof window !== "undefined") {
    const list = getRegistrations();
    list.unshift(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  // Sync strictly to Supabase Database table "customers"
  try {
    const dbCustomer: SupabaseCustomer = {
      full_name: reg.fullName,
      mobile: reg.mobile,
      whatsapp: reg.whatsapp,
      email: reg.email,
      house_no: reg.houseNo,
      village: reg.locality,
      mandal: reg.locality,
      district: reg.city,
      pincode: reg.pincode,
      gps_lat: reg.gpsLat,
      gps_lng: reg.gpsLng,
      order_type: reg.orderType,
      selected_plan_id: reg.selectedPlanId,
      selected_product_id: reg.selectedProductId,
      delivery_slot: reg.deliverySlot,
      status: reg.status,
      registered_at: reg.registeredAt,
    };

    supabase
      .from("customers")
      .insert([dbCustomer])
      .then(({ error }) => {
        if (error) {
          console.log("Supabase sync notice:", error.message);
        } else {
          console.log("✅ Customer saved to Supabase PostgreSQL database!");
        }
      });
  } catch {
    // ignore
  }

  return newId;
}

export function checkExistingUser(mobile: string, email?: string): { exists: boolean; reason?: string } {
  const cleanMobile = mobile.replace(/\D/g, "");
  const list = getRegistrations();

  if (cleanMobile) {
    const foundMobile = list.find((c) => c.mobile.replace(/\D/g, "") === cleanMobile);
    if (foundMobile) {
      return {
        exists: true,
        reason: `Mobile number (+91 ${cleanMobile}) is already registered! Please login directly or try another number.`,
      };
    }
  }

  if (email && email.trim()) {
    const cleanEmail = email.trim().toLowerCase();
    const foundEmail = list.find((c) => c.email && c.email.trim().toLowerCase() === cleanEmail);
    if (foundEmail) {
      return {
        exists: true,
        reason: `Email address (${email}) is already registered! Please login directly.`,
      };
    }
  }

  return { exists: false };
}
