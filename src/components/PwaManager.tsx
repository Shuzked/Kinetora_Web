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

      const handleUpdate = async (worker: ServiceWorker) => {
        // Pillar 3: Seguridad contra bucles infinitos
        const lastReload = sessionStorage.getItem('pwa_reload_guard');
        const now = Date.now();
        
        if (lastReload && (now - parseInt(lastReload)) < 10000) {
          console.warn('⚠️ Loop de recarga detectado. Abortando auto-reload.');
          return;
        }

        sessionStorage.setItem('pwa_reload_guard', now.toString());
        
        // Purga explícita de caches del navegador antes de recargar
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(key => caches.delete(key)));
          console.log('🧹 CacheStorage purgado con éxito');
        }

        showSuccess("Nueva versión detectada. Limpiando caché y actualizando...");
        
        // Enviamos señal de skipWaiting al worker
        worker.postMessage({ type: 'SKIP_WAITING' });
      };

      // Escuchar el cambio de controlador para recargar solo una vez
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          // Pequeño delay para asegurar que los assets estén listos
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      });

      const checkVersion = async () => {
        try {
          const resp = await fetch('/version.json', { cache: 'no-store' });
          const data = await resp.json();
          const localVersion = localStorage.getItem('kinetora_version');
          
          if (localVersion && data.version !== localVersion) {
            console.log(`🆕 Nueva versión detectada: ${data.version} (Actual: ${localVersion})`);
            localStorage.setItem('kinetora_version', data.version);
            
            // Forzar actualización del SW y recarga
            const reg = await navigator.serviceWorker.getRegistration();
            if (reg && reg.waiting) {
              await handleUpdate(reg.waiting);
            } else {
              // Si no hay SW esperando, realizamos purga manual y recargamos
              if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(key => caches.delete(key)));
              }
              window.location.reload();
            }
          } else if (!localVersion) {
            localStorage.setItem('kinetora_version', data.version);
          }
        } catch (e) {
          console.error('Error verificando versión:', e);
        }
      };

      registerSW();
      
      // Chequeo inicial y luego cada 2 minutos
      checkVersion();
      const interval = setInterval(checkVersion, 1000 * 60 * 2);
      
      return () => clearInterval(interval);
    }
  }, []);

  return null;
};

export default PwaManager;
