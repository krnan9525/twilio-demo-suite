// add push listener for web worker
// this will not work in development environment

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

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (const windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});

self.addEventListener('fetch', event => {});
