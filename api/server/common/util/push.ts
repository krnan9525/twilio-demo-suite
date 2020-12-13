import webPush from 'web-push';

export interface ISubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export default function sendNotification(
  pushSubscription: ISubscription,
  payload: string
): void {
  // TODO: extract this
  const vapidKeys = {
    publicKey:
      'BIxgxpz-2yCxYhx5a0sSByNCD8_X4lFciyI7ZfazdYFm_tYE7nZjlmzJHnikFnhblepF_BuKbTDKeFaMiRgR8-Y',
    privateKey: process.env.VAPID_PRIVATE_KEY
  };

  const options = {
    gcmAPIKey: process.env.GCM_API_KEY,
    TTL: 60
  };

  webPush.setVapidDetails(
    'mailto:me@marknanyang.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  webPush.sendNotification(pushSubscription, payload, options);
}
