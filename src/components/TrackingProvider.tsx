"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking";

export default function TrackingProvider() {
  // ViewContent (page view)
  useEffect(() => {
    track("ViewContent", { page: "LP Anak Muslim" });
  }, []);

  // Global InitiateCheckout listener
  useEffect(() => {
    function handler(e: Event) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest("[data-track='initiate_checkout']");
      if (el) {
        track("InitiateCheckout");
      }
    }

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null; // tidak render apa-apa
}
