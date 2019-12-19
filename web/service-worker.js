// add push listener for web worker
// this will not work in development environment

// use Workbox for asset caching
workbox.core.setCacheNameDetails({ prefix: 'call-router-web' });

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text());
    showLocalNotification(
      'Your Twilio Call Result',
      event.data.text(),
      self.registration
    );
  } else {
    console.log('Push event but no data');
  }
});
const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body
    // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
};

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (const windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
