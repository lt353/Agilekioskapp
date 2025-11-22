// Service Worker for UHMC Kiosk App
// Handles offline caching for static assets and external images

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

// Static assets to cache on install
const STATIC_ASSETS = [
  '/Agilekioskapp/',
  '/Agilekioskapp/index.html',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Delete old versions of our caches
            return (
              cacheName.startsWith('static-') ||
              cacheName.startsWith('images-') ||
              cacheName.startsWith('runtime-')
            ) && cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Handle image requests (both local and external)
  if (request.destination === 'image' ||
      /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)) {
    event.respondWith(imageCache(request));
    return;
  }

  // Handle JavaScript and CSS files
  if (request.destination === 'script' ||
      request.destination === 'style' ||
      /\.(js|css)$/i.test(url.pathname)) {
    event.respondWith(staticCache(request));
    return;
  }

  // Handle font files
  if (request.destination === 'font' ||
      /\.(woff|woff2|ttf|otf|eot)$/i.test(url.pathname)) {
    event.respondWith(staticCache(request));
    return;
  }

  // Handle Supabase API requests - network first, cache as fallback
  if (url.hostname.includes('supabase')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Default: network first with cache fallback
  event.respondWith(networkFirst(request));
});

// Image caching strategy: Stale-while-revalidate
// Serves cached images immediately while fetching updates in background
async function imageCache(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);

  // Fetch from network and update cache in background
  const networkFetch = fetch(request).then((response) => {
    // Only cache successful responses
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch((error) => {
    console.log('[Service Worker] Network fetch failed for image:', request.url, error);
    return null;
  });

  // Return cached version immediately if available, otherwise wait for network
  return cached || networkFetch;
}

// Static asset caching: Cache first, fallback to network
async function staticCache(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[Service Worker] Network fetch failed for static asset:', request.url, error);
    throw error;
  }
}

// Network first strategy: Try network, fallback to cache
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[Service Worker] Network request failed, trying cache:', request.url);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    // Preload specific URLs into cache
    event.waitUntil(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});
