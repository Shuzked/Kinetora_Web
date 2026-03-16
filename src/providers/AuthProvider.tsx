"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  email: string;
  name?: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const KEY = "kinetora.user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const signIn = (email: string, name?: string) => {
    const u = { email, name: name || email.split("@")[0] };
    setUser(u);
    try {
      localStorage.setItem(KEY, JSON.stringify(u));
    } catch {}
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: !!user, signIn, signOut }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}