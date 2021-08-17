var cacheName = 'rv3-pwa-v3'+Math.random();
var filesToCache = [
  // '/rv3_super',
<<<<<<< HEAD
  '/rv3_superv1/android_home',
=======
  // '/rv3_tonyav1/android_home',
>>>>>>> 417440d6b7e774f6c585e6b08422813ec57bad65
  // '/css/style.css',
  // '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });

self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
});

// Active Service Worker
// self.addEventListener('activate', evt => {
//     console.log("service worker activated")
// })

self.addEventListener('activate', function(event) {
    console.log("service worker activated");
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    // Return true if you want to remove this cache,
                    // but remember that caches are shared across
                    // the whole origin
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Fetch service
self.addEventListener('fetch', evt => {
    // console.log("Data is fetched", evt);
    // evt.respondWith(
    //   // Try the cache
    //   caches.match(evt.request).then(function(cacheRes) {
    //     // Fall back to network
    //     return cacheRes || fetch(evt.request);
    //   }).catch(function() {
    //     console.log("It is offline");
    //     return caches.match('offline.html');
    //   })
    // )
})
