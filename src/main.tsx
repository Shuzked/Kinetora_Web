import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { SilentErrorBoundary } from './components/SilentErrorBoundary'
import './globals.css'

const container = document.getElementById('root') as HTMLElement;

const app = (
  <React.StrictMode>
    <SilentErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SilentErrorBoundary>
  </React.StrictMode>
);

// Estrategia de Hidratación Resiliente (Senior Level)
const isRecoveryMode = typeof window !== "undefined" && sessionStorage.getItem("kinetora_recovery_mode") === "true";

if (container.hasChildNodes() && !isRecoveryMode) {
  try {
    console.log("[Hydration] Attempting hydration...");
    ReactDOM.hydrateRoot(container, app);
  } catch (e) {
    console.error("[Hydration] Critical hydration failure. Falling back to CSR.", e);
    sessionStorage.setItem("kinetora_recovery_mode", "true");
    container.innerHTML = ""; // Purgar DOM estático fallido
    ReactDOM.createRoot(container).render(app);
  }
} else {
  if (isRecoveryMode) {
    console.warn("[Hydration] Running in recovery mode (CSR Only).");
    sessionStorage.removeItem("kinetora_recovery_mode"); // Limpiar para el próximo refresh
    container.innerHTML = ""; 
  }
  ReactDOM.createRoot(container).render(app);
}