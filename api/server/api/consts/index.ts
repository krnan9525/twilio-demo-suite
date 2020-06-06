export const hostUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://calls.api.marknanyang.com/'
    : 'https://1b98a9bc.ngrok.io/';

export const publicApiEndpoint = 'https://accounts.twilio.com/v1/';
