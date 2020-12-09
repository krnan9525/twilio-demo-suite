/* eslint-disable no-console */
import Keys from '../const/keys';

if ('Notification' in window) {
  try {
    // Chrome and most of other browsers
    Notification && Notification.requestPermission().then(res => {});
  } catch (e) {
    // Safari on desktop
    Notification && Notification.requestPermission(res => {});
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then(function(reg) {
      reg.pushManager.getSubscription().then(function(sub) {
        if (sub === null) {
          subscribeUser();
        } else {
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
        .then(sub => {})
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
