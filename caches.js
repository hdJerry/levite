let CACHE_NAME = 'static-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>{
      // console.log("opened cache");
      return cache.addAll([
          '/',
          'index.html',
          'css/main.css',
          'css/bootstrap.css',
          'js/jquery-1.12.4.min.js',
          'js/downloadfiles.js',
          'js/script.js',
          'js/readmp3.js',
          'js/audio.min.js',
          'js/player-graphics.gif',
          'img/logo/yemi-text-lg.png',
          'img/levite-no-bg.png',
          'img/levite-word.png',
          'mp3/YemiLeviteFtElijahOyelade-Keep-yourword.mp3',
          'mp3/Yemi_Levite_-_Your_Word_Is_True.mp3'
        ]);
    })
  );

});



self.addEventListener('activate', (event) =>{
  event.waitUntil(
    caches.keys().then((cacheNames) =>{
      return Promise.all(
        cacheNames.filter((cacheName) =>{
          return cacheName.startsWith('static-') && cacheName != CACHE_NAME;
        }).map((cacheName) =>{
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // console.log(event.request);
  let requestUrl = new URL(event.request.url);
  // console.log(requestUrl);
  event.respondWith(
    caches.match(event.request)
    .then((response) =>{
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
  .then((response) =>{
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then((cache) =>{
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch((error) =>{
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here

  });
}

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
