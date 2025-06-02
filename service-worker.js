const CACHE_NAME = "meteo-cache-v1";
const FILES_TO_CACHE = [
  "/Meteo/",
  "/Meteo/index.html",
  "/Meteo/style.css",
  "/Meteo/script.js",
  "/Meteo/manifest.json",
  "/Meteo/icons/icon-192.png",
  "/Meteo/icons/icon-512.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
