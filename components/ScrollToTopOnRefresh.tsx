"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force instant scroll to top on mount / refresh / route change
      window.scrollTo(0, 0);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }
  }, [pathname]);

  return null;
}
