import twilio from 'twilio';
import L from '../../common/logger';
import { clientIdentity } from '../consts';

interface IClientIdentity {
  identity: string;
  token: string;
}

export class VideoService {
  async getClientTokenForVoice(
    apiKey,
    secret,
    twiMlAppSidParam,
    accountSid
  ): Promise<IClientIdentity> {
    try {
      const accessToken = new twilio.jwt.AccessToken(
        accountSid,
        apiKey,
        secret,
        {
          identity: clientIdentity
        }
      );

      const grant = new twilio.jwt.AccessToken.VideoGrant({
        room: 'twilio-demo-suite-room-' + Math.floor(Date.now() / 1000)
      });
      accessToken.addGrant(grant);

      return {
        identity: clientIdentity,
        token: accessToken.toJwt()
      };
    } catch (e) {
      L.error(e);
      throw e;
    }
  }
}

export default new VideoService();
