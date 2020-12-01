export const hostUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://calls.api.marknanyang.com/'
    : 'https://1b98a9bc.ngrok.io/';

export const publicApiEndpoint = 'https://accounts.twilio.com/v1/';
export const publicTwilioEndpoint2010 = 'https://api.twilio.com/2010-04-01/';
export const clientIdentity = 'twilio-demo-suite-client';
