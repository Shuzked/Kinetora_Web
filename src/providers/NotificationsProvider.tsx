"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type NotificationType = "done" | "review" | "message";

export type NotificationItem = {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type: NotificationType;
  requestId?: string;
};

type NotificationsContextValue = {
  items: NotificationItem[];
  unreadCount: number;
  markAllRead: () => void;
  toggleRead: (id: string) => void;
  remove: (id: string) => void;
  add: (n: NotificationItem) => void;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

const initialNotifications: NotificationItem[] = [
  { id: "N-1", title: "Diseño de Landing Page completado", time: "hace 2h", read: false, type: "done", requestId: "REQ-001" },
  { id: "N-2", title: "Vídeo AD en revisión (v2)", time: "hace 5h", read: false, type: "review", requestId: "REQ-002" },
  { id: "N-3", title: "Nuevo mensaje del equipo en Pitch Deck", time: "ayer", read: true, type: "message", requestId: "REQ-003" },
];

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);

  const unreadCount = useMemo(() => items.filter(i => !i.read).length, [items]);

  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, read: true })));
  const toggleRead = (id: string) =>
    setItems(prev => prev.map(i => (i.id === id ? { ...i, read: !i.read } : i)));
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const add = (n: NotificationItem) => setItems(prev => [n, ...prev]);

  const value = useMemo(
    () => ({ items, unreadCount, markAllRead, toggleRead, remove, add }),
    [items, unreadCount]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotificationsContext = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotificationsContext must be used within NotificationsProvider");
  return ctx;
};