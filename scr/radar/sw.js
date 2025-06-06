/*
Service Worker Mind Radar
- Кэширование app shell
- Заготовка для кэширования wttr.in
*/
const CACHE_NAME = 'mindradar-shell-v1';
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/app.css',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/sentiment@5.0.2/dist/sentiment.min.js'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS))
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  const url = event.request.url;
  // Кэширование app shell
  if (SHELL_ASSETS.some(asset => url.endsWith(asset))) {
    event.respondWith(
      caches.match(event.request).then(resp => resp || fetch(event.request))
    );
    return;
  }
  // Кэширование wttr.in (cache-first)
  if (url.includes('wttr.in')) {
    event.respondWith(
      caches.open('mindradar-weather-v1').then(cache =>
        cache.match(event.request).then(resp =>
          resp || fetch(event.request)
            .then(networkResp => {
              if (networkResp.ok) cache.put(event.request, networkResp.clone());
              return networkResp;
            })
            .catch(() => new Response(JSON.stringify({
              current_condition: [{ weatherDesc: [{ value: "?" }], temp_C: "?" }],
              nearest_area: [{ areaName: [{ value: "?" }], country: [{ value: "?" }] }]
            }), { headers: { 'Content-Type': 'application/json' } }) )
        )
      )
    );
    return;
  }
});
