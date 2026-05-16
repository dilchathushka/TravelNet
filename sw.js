const CACHE_NAME = 'travelnest-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/explorer.html',
  '/budget.html',
  '/generator.html',
  '/mood.html',
  '/feedback.html',
  '/styles.css',
  '/script.js',
  '/data.js',
  '/manifest.json',
  '/TN.ico',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/pictures/swiss-alps.png',
  '/pictures/bali.jpg',
  '/pictures/paris.png',
  '/pictures/tokyo.png',
  '/pictures/cape-town.png',
  '/pictures/new-york.png'
];


// Install Event - Caching static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event - Cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event - Serving from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request for the network call
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response for the cache
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          // Don't cache if it's not a GET request (e.g. Chrome extensions)
          if (event.request.method === 'GET') {
            cache.put(event.request, responseToCache);
          }
        });

        return response;
      }).catch(() => {
        // Fallback for offline if request fails
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
