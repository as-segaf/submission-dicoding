const CACHE_NAME = "football";
var urlsToChace = [
    '/',
    './index.html',
    './nav.html',
    './team.html',
    './pages/about.html',
    './pages/contact.html',
    './pages/home.html',
    './js/api.js',
    './js/materialize.min.js',
    './js/nav.js',
    './css/materialize.css',
    './mainfest.json',
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToChace);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("service worker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event){
  const base_url = "https://api.football-data.org/v2";
  if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
          caches.open(CACHE_NAME).then(function(cache) {
              return fetch(event.request).then(function(response) {
                  cache.put(event.request.url, response.clone());
                  return response;
              })
          })
      );
  }  else {
      event.respondWith(
          caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
              return response || fetch (event.request);
          })
      )
  }
});