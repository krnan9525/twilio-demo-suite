/* eslint-disable no-console */
import Keys from '../const/keys';

Notification.requestPermission().then(res => {
  console.log('Notification permission status:', res);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then(function(reg) {
      console.log('Service Worker Registered!', reg);

      reg.pushManager.getSubscription().then(function(sub) {
        if (sub === null) {
          // Update UI to ask user to register for Push
          console.log('Not subscribed to push service!');
          subscribeUser();
        } else {
          // We have a subscription, update the database
          console.log('Subscription object: ', sub);
          subscribeUser();
        }
      });
    })
    .catch(function(err) {
      console.log('Service Worker registration failed: ', err);
    });
}

function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(reg => {
      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: Keys.applicationServerKey
        })
        .then(sub => {
          // console.log(JSON.stringify(sub));
          console.log('Subscribed with WebPush API');
        })
        .catch(function(e) {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied');
          } else {
            console.error('Unable to subscribe to push', e);
          }
        });
    });
  }
}
