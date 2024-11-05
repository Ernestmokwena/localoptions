const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  'invalid-image.png',
  'invalid-image2.png',
  'invalid-image3.png',
  'invalid-image4.png',
  'invalid-image5.png',
  'invalid-image6.png',
  'invalid-image7.png',
  'invalid-image8.png',
  'invalid.html',
  'index.html'
];

// Install the service worker and cache the specified files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch files from the cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Activate the service worker and remove old caches if needed
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});
