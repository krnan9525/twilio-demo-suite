import L from '../../common/logger';
import axios from 'axios';
import twilio from 'twilio';
import { publicTwilioEndpoint2010 } from '../consts';

interface ICapacityDirection {
  in: boolean;
  out: boolean;
}

interface INumber {
  country: string | null;
  number: string;
  sid: string;
  friendlyName: string | null;
  voiceEnabled: ICapacityDirection;
  smsEnabled: ICapacityDirection;
  mmsEnabled: ICapacityDirection;
}

interface IApiKey {
  sid: string;
  secret: string;
}

export class UsersService {
  /**
   * @param accountSid
   * @param accessToken
   */
  async getNumbers(
    accountSid: string,
    accessToken: string
  ): Promise<INumber[]> {
    const url = `${publicTwilioEndpoint2010}Accounts/${accountSid}/IncomingPhoneNumbers.json`;
    try {
      const res = await axios.get(url, {
        auth: {
          username: accountSid,
          password: accessToken
        }
      });
      return res.data.incoming_phone_numbers.map(number => {
        return {
          country:
            number.geography && number.geography.iso_country
              ? number.geography.iso_country
              : null,
          number: number.phone_number,
          friendlyName: number.friendly_name
            ? number.friendly_name
            : number.phone_number,
          sid: number.sid,
          voiceEnabled: {
            in: number?.capabilities
              ? number?.capabilities?.voice === true
              : true,
            out: number?.capabilities
              ? number?.capabilities?.voice === true
              : true
          },
          smsEnabled: {
            in: number?.capabilities
              ? number?.capabilities?.sms === true
              : true,
            out: number?.capabilities
              ? number?.capabilities?.sms === true
              : true
          },
          mmsEnabled: {
            in: number?.capabilities
              ? number?.capabilities?.mms === true
              : true,
            out: number?.capabilities
              ? number?.capabilities?.mms === true
              : true
          }
        } as INumber;
      });
    } catch (e) {
      L.error(e);
      throw e;
    }
  }

  async createNewApiKey(
    accountSid: string,
    accessToken: string
  ): Promise<IApiKey> {
    try {
      const client = twilio(accountSid, accessToken);
      const key = await client.newKeys.create({
        friendlyName: 'twilio-demo-suite-' + Math.floor(Date.now() / 1000)
      });
      return {
        sid: key.sid,
        secret: key.secret
      };
    } catch (e) {
      L.error(e);
      throw e;
    }
  }
}

export default new UsersService();
