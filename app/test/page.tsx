"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const [message, setMessage] = useState("Checking Supabase...");

  useEffect(() => {
    async function checkConnection() {
      const { error } = await supabase
        .from("customers")
        .select("*")
        .limit(1);

      if (error) {
        setMessage("❌ Error: " + error.message);
      } else {
        setMessage("✅ Supabase Connected Successfully!");
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          NSV Pure Milk
        </h1>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}