"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  userEmail: string | null;
  setAuth: (data: {
    token: string;
    userName?: string | null;
    userEmail?: string | null;
  }) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      userEmail: null,
      setAuth: ({ token, userName, userEmail }) =>
        set({
          token,
          userName: userName ?? null,
          userEmail: userEmail ?? null,
        }),
      logout: () => set({ token: null, userName: null, userEmail: null }),
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
