import twilio from 'twilio';
import L from '../../common/logger';
import { clientIdentity, hostUrl } from '../consts';

interface ITwiMLApp {
  sid: string;
  name: string;
}

interface IClientIdentity {
  identity: string;
  token: string;
}

export class VoipService {
  async createTwiMLApp(
    accountSid: string,
    accessToken: string
  ): Promise<ITwiMLApp> {
    try {
      const client = twilio(accountSid, accessToken);
      const twiMLCallbackUrl = `${hostUrl}api/v1/voip/twiml-app/response`;
      const application = await client.applications.create({
        voiceMethod: 'POST',
        voiceUrl: twiMLCallbackUrl,
        friendlyName: 'twilio-demo-suite-' + Math.floor(Date.now() / 1000)
      });
      return {
        sid: application.sid,
        name: application.friendlyName
      };
    } catch (e) {
      L.error(e);
      throw e;
    }
  }
  async getTwiMlResponse(from: string, to: string): Promise<string> {
    const twiml = new twilio.twiml.VoiceResponse();

    if (to) {
      const dial = twiml.dial({
        answerOnBridge: true,
        callerId: from
      });
      dial.number(to);
    } else {
      twiml.say('To number is not provided. This call will be ended.');
    }
    return twiml.toString();
  }
  async getClientTokenForVoip(
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

      const grant = new twilio.jwt.AccessToken.VoiceGrant({
        outgoingApplicationSid: twiMlAppSidParam,
        incomingAllow: true
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

export default new VoipService();
