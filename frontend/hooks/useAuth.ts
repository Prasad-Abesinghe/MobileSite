"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  userEmail: string | null;
  role: "user" | "admin" | null;
  setAuth: (data: {
    token: string;
    userName?: string | null;
    userEmail?: string | null;
    role?: "user" | "admin" | null;
  }) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      userEmail: null,
      role: null,
      setAuth: ({ token, userName, userEmail, role }) =>
        set({
          token,
          userName: userName ?? null,
          userEmail: userEmail ?? null,
          role: role ?? null,
        }),
      logout: () =>
        set({ token: null, userName: null, userEmail: null, role: null }),
    }),
    {
      name: "auth_store",
    }
  )
);

export const useIsAuthenticated = () => {
  const token = useAuth((s) => s.token);
  return Boolean(token);
};

export const useIsAdmin = () => {
  const role = useAuth((s) => s.role);
  return role === "admin";
};
