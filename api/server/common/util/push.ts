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
    privateKey: '***REMOVED***'
  };

  const options = {
    gcmAPIKey: '***REMOVED***',
    TTL: 60
  };

  webPush.setVapidDetails(
    'mailto:me@marknanyang.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  webPush.sendNotification(pushSubscription, payload, options);
}
