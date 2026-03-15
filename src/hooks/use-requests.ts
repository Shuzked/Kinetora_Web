"use client";

import { useRequestsContext } from "@/providers/RequestsProvider";

export const useRequests = () => {
  return useRequestsContext();
};