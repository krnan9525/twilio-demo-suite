export const hostUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://intense-stream-63035.herokuapp.com/'
    : 'https://e0840943ae22.ngrok.io/';

export const publicApiEndpoint = 'https://accounts.twilio.com/v1/';
export const publicTwilioEndpoint2010 = 'https://api.twilio.com/2010-04-01/';
export const clientIdentity = 'twilio-demo-suite-client';
export const redisPrefix = {
  videoRoom: 'video-room-'
};
