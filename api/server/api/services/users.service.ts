import L from '../../common/logger';
import axios from 'axios';

interface INumber {
  country: string | null;
  number: string;
  sid: string;
  friendlyName: string | null;
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
    const url = 'https://preview.twilio.com/Numbers/ActiveNumbers';
    try {
      const res = await axios.get(url, {
        auth: {
          username: accountSid,
          password: accessToken
        }
      });
      return res.data.items.map(number => {
        return {
          country:
            number.geography && number.geography.iso_country
              ? number.geography.iso_country
              : null,
          number: number.phone_number,
          friendlyName:
            number.configurations && number.configurations.friendly_name
              ? number.configurations.friendly_name
              : null,
          sid: number.sid
        } as INumber;
      });
    } catch (e) {
      L.error(e);
      throw e;
    }
  }
}

export default new UsersService();
