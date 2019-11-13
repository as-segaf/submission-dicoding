CACHE_NAME = "firstpwa";
urlsToCache = [
    "/",
    "./index.html",
    "./nav.html",
    "./images/github.png",
    "./images/ninja.png",
    "./images/ttt.png",
    "./js/materialize.min.js",
    "./js/nav.js",
    "./css/materialize.min.css",
    "./pages/about.html",
    "./pages/contact.html",
    "./pages/gallery.html",
    "./pages/home.html",
    "./manifest.json"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event){
    event.respondWith((
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("Service worker : gunakan asset dari cache : ", response.url);
                    return response;
                }

                console.log("Service worker : memuat asset dari server : ", event.request.url);
                return fetch(event.request);
            })
    ));
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map( function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("Service worker : cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});