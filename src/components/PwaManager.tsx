import React, { useEffect } from 'react';
import { showSuccess } from "@/utils/toast";

const PwaManager: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('✅ SW registrado con éxito:', registration.scope);

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nueva versión detectada y lista para activarse
                  console.log('🚀 Nueva versión disponible. Activando...');
                  handleUpdate(newWorker);
                }
              });
            }
          });
        } catch (error) {
          console.error('❌ Error registrando el SW:', error);
        }
      };

      const handleUpdate = (worker: ServiceWorker) => {
        // Seguridad contra bucles infinitos
        const lastReload = sessionStorage.getItem('pwa_reload_guard');
        const now = Date.now();
        
        if (lastReload && (now - parseInt(lastReload)) < 10000) {
          console.warn('⚠️ Loop de recarga detectado. Abortando auto-reload.');
          return;
        }

        sessionStorage.setItem('pwa_reload_guard', now.toString());
        showSuccess("Nueva versión cargada. Reiniciando para aplicar cambios...");
        
        // Enviamos señal de skipWaiting al worker
        worker.postMessage({ type: 'SKIP_WAITING' });
      };

      // Escuchar el cambio de controlador para recargar solo una vez
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

      registerSW();
    }
  }, []);

  return null;
};

export default PwaManager;
