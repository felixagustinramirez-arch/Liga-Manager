// Service Worker de Liga KONAMI
// Sube este número cada vez que publiques cambios en index.html para que
// los dispositivos (incluido iPhone) descarguen la versión nueva.
const VERSION = "v1";
const CACHE_NAME = "liga-konami-" + VERSION;

// "App shell": todo lo necesario para que la app cargue y funcione sin red.
// Los datos del torneo NO están aquí: viven en localStorage, dentro del propio
// dispositivo, así que sobreviven sin conexión de forma independiente a esta caché.
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  // No llamamos a skipWaiting() aquí: esperamos a que index.html nos lo pida
  // (mensaje SKIP_WAITING) para no interrumpir a alguien a mitad de una acción.
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(
        nombres
          .filter((nombre) => nombre !== CACHE_NAME)
          .map((nombre) => caches.delete(nombre))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Navegación (abrir/recargar la app): red primero para tener la versión más
  // reciente cuando hay conexión, con la caché como respaldo sin conexión.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copia));
          return respuesta;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Resto de recursos (React por CDN, iconos, manifest): caché primero,
  // y si no está, se pide a la red y se guarda para la próxima vez offline.
  event.respondWith(
    caches.match(request).then((cacheada) => {
      if (cacheada) return cacheada;
      return fetch(request).then((respuesta) => {
        if (respuesta && respuesta.ok) {
          const copia = respuesta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
        }
        return respuesta;
      });
    })
  );
});
