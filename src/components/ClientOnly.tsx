"use client";

import React, { useState, useEffect, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly
 * 
 * Protocolo de aislamiento de hidratación estricto.
 * Obliga al componente a renderizarse exclusivamente en el cliente,
 * evitando cualquier colisión entre el HTML del servidor y el DOM inicial.
 */
export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ClientOnly;
