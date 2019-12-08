const webPush = require('web-push');

export interface ISubscription {
  endpoint: string,
  keys: {
    p256dh: string,
    auth: string
  }
}

export default function sendNotification(pushSubscription: ISubscription, payload: string) {
  // TODO: extract this
  const vapidKeys = {
    publicKey:
      'BIxgxpz-2yCxYhx5a0sSByNCD8_X4lFciyI7ZfazdYFm_tYE7nZjlmzJHnikFnhblepF_BuKbTDKeFaMiRgR8-Y',
    privateKey: 'QZfI8cZSZ83EutxtHCIaK4SOivY_Sx6QwQvU_myDdM0'
  };

  const options = {
    gcmAPIKey: 'AIzaSyDiYpOhrFFsqh5rm4YhutDEfB26EJxS-7M',
    TTL: 60
  };

  webPush.setVapidDetails(
    'mailto:me@marknanyang.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  webPush.sendNotification(pushSubscription, payload, options);
}
