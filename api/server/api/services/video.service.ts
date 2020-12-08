import twilio from 'twilio';
import L from '../../common/logger';
import { clientIdentity, redisPrefix } from '../consts';
import Redis from '../../common/util/redisHelper';

interface IClientIdentity {
  identity: string;
  token: string;
  room: string;
}

export class VideoService {
  async getNewRoomClientTokenForVoice({
    apiKey,
    apiSecret,
    accountSid,
    password,
    name
  }): Promise<IClientIdentity> {
    try {
      const identity = name || clientIdentity + Math.floor(Date.now() / 1000);
      const room = 'twilio-demo-suite-room-' + Math.floor(Date.now() / 1000);
      const accessToken = new twilio.jwt.AccessToken(
        accountSid,
        apiKey,
        apiSecret,
        {
          identity
        }
      );

      const grant = new twilio.jwt.AccessToken.VideoGrant({
        room
      });
      accessToken.addGrant(grant);

      // store room info in Redis
      await Redis.set(
        redisPrefix.videoRoom + room,
        JSON.stringify({ password, apiKey, apiSecret, accountSid })
      );

      return {
        identity,
        token: accessToken.toJwt(),
        room
      };
    } catch (e) {
      L.error(e);
      throw e;
    }
  }

  async getJoiningRoomClientTokenForVoice(
    room,
    password,
    name
  ): Promise<IClientIdentity> {
    try {
      const identity = name || clientIdentity + Math.floor(Date.now() / 1000);
      const roomInfoStr = await Redis.get(redisPrefix.videoRoom + room);
      const roomInfo = JSON.parse(roomInfoStr);

      if (password !== roomInfo.password) {
        throw new Error('incorrect password');
      }

      const accessToken = new twilio.jwt.AccessToken(
        roomInfo.accountSid,
        roomInfo.apiKey,
        roomInfo.apiSecret,
        {
          identity
        }
      );

      const grant = new twilio.jwt.AccessToken.VideoGrant({
        room
      });
      accessToken.addGrant(grant);

      return {
        identity,
        token: accessToken.toJwt(),
        room
      };
    } catch (e) {
      L.error(e);
      throw e;
    }
  }
}

export default new VideoService();
