"use client";

import { useNotificationsContext } from "@/providers/NotificationsProvider";

export const useNotifications = () => {
  return useNotificationsContext();
};