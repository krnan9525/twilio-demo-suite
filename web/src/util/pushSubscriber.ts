import Keys from '@/const/keys';

export class PushSubscriber {
  /**
   * @description this function will return an object containing subscribe info for this browser instance
   */
  getSubscriber() {
    return new Promise((resolve, reject) => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(reg => {
          if (reg.pushManager) {
            reg.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: Keys.applicationServerKey
              })
              .then(function(sub) {
                resolve(JSON.parse(JSON.stringify(sub)));
              })
              .catch(function(e) {
                reject();
              });
          } else {
            // iOS does not support push notifications
            resolve(null);
          }
        });
      }
    });
  }
}

export default new PushSubscriber();
