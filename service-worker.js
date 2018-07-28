var cacheName = 'icalc';
var filesToCache = [
  '/templates/static/favicon/manifest.json',
  '/templates/static/css/bootstrap.min.css',
  '/templates/static/css/mdb.min.css',
  '/templates/static/css/styles.css',
  '/templates/static/js/jquery.min.js',
  '/templates/static/favicon/apple-touch-icon.png',
  '/templates/static/favicon/favicon-32x32.png',
  '/templates/static/favicon/favicon-16x16.png',
  '/templates/static/favicon/safari-pinned-tab.svg',
  '/templates/static/favicon/favicon.ico',
  '/templates/static/js/popper.min.js',
  '/templates/static/js/bootstrap.min.js',
  '/templates/static/js/mdb.min.js',
  '/templates/static/js/custom.js',
  '/templates/static/js/functions.js',
  '/templates/static/font/roboto/Roboto-Light.woff2',
  '/templates/static/font/roboto/Roboto-Regular.woff2',
  '/templates/static/font/roboto/Roboto-Bold.woff2',
  '/templates/static/font/roboto/Roboto-Medium.woff2',
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
