/*
Service Worker Mind Radar
- Кэширование app shell
- Заготовка для кэширования wttr.in
*/
const CACHE_NAME = 'mindradar-shell-v1';
const SHELL_ASSETS = [
  '/scr/radar/',
  '/scr/radar/index.html',
  '/scr/radar/app.js',
  '/scr/radar/app.css',
  '/scr/radar/manifest.json',
  '/scr/radar/sentiment.min.js'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS))
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // Удаляем все старые кэши, кроме актуального
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME && name !== 'mindradar-weather-v1').map(name => caches.delete(name))
      );
      await self.clients.claim();
      await self.skipWaiting();
    })()
  );
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
