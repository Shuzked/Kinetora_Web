const CACHE_NAME = 'kinetora-cache-v1.2';

// Recursos críticos que NUNCA debemos cachear en el SW
const IGNORE_CACHE = [
  'sw.js',
  'service-worker.js',
  'index.html',
  'version.json' // Útil para comprobaciones de versión
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forzar activación inmediata
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eliminamos cualquier caché que no sea la actual
          if (cacheName !== CACHE_NAME) {
            console.log('🧹 Limpiando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // No cachear nada que esté en la lista de ignorados o peticiones POST/externas
  if (
    IGNORE_CACHE.some(path => url.pathname.endsWith(path)) ||
    event.request.method !== 'GET' ||
    !url.origin.includes(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Escuchar mensaje para saltar espera ( skipWaiting )
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
