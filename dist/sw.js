const CACHE_NAME = 'kinetora-cache-v1';

// Recursos críticos que queremos que el SW ignore para que siempre vengan frescos (o los maneje el navegador)
const IGNORE_CACHE = [
  'sw.js',
  'service-worker.js',
  'index.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forzar activación inmediata
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Tomar control de los clientes inmediatamente
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
