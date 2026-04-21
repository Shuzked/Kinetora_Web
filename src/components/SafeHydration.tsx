"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
}

/**
 * SafeHydration
 * 
 * Boundary granular para componentes aislados (Hero animations, 3D, etc).
 * Si el componente falla, se degrada al 'fallback' o no muestra nada, 
 * permitiendo que el resto del layout siga vivo.
 */
export class SafeHydration extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(`[SafeHydration] Component "${this.props.name || 'Unknown'}" failed:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

export default SafeHydration;
