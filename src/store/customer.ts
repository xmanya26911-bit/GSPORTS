"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Customer } from "@/types";

type CustomerState = {
  customer: Customer | null;
  status: "idle" | "loading" | "authed" | "guest";
  loaded: boolean;
  load: () => Promise<void>;
  setCustomer: (c: Customer | null) => void;
  logout: () => Promise<void>;
};

export const useCustomer = create<CustomerState>()(
  persist(
    (set, get) => ({
      customer: null,
      status: "idle",
      loaded: false,
      load: async () => {
        if (get().loaded) return;
        set({ status: "loading" });
        try {
          const res = await fetch("/api/me", { cache: "no-store" });
          if (res.status === 401) {
            set({ customer: null, status: "guest", loaded: true });
            return;
          }
          const data = (await res.json()) as { customer: Customer | null };
          set({ customer: data.customer, status: data.customer ? "authed" : "guest", loaded: true });
        } catch {
          set({ status: "guest", loaded: true });
        }
      },
      setCustomer: (c) => set({ customer: c, status: c ? "authed" : "guest", loaded: true }),
      logout: async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        set({ customer: null, status: "guest" });
      },
    }),
    {
      name: "gw-customer",
      partialize: (state) => ({ customer: state.customer, status: state.status }),
    }
  )
);
