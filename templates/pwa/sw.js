// SERVICE WORKER — cache-first, offline fallback
// ------------------------------------------------
// HOW TO USE:
//   1. Copy this file into the root of the app repo (same level as index.html).
//   2. Update ASSETS below to list the files your app needs offline.
//   3. Update the CACHE name when you deploy a new version (e.g. appname-v2)
//      so users get fresh files rather than stale cache.
//   4. Add this to every HTML page just before </body>:
//
//      <script>
//        if ('serviceWorker' in navigator)
//          navigator.serviceWorker.register('sw.js');
//      </script>
//
// NOTE: sw.js must live at the root of the app, not in a subfolder,
// otherwise it can only control pages under that subfolder.

const CACHE  = '[appname]-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css'
];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)))
);

self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
);

self.addEventListener('fetch', e =>
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  )
);
