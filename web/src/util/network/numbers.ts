import axios from 'axios';
import endpoints from '@/util/network/endpoints';

export class Numbers {
  getActiveNumbers(accountSid: string, accessToken: string) {
    return axios
      .get(endpoints.host + endpoints.activeNumbers.get, {
        params: {
          accountSid,
          accessToken
        }
      })
      .then(res => {
        return res.data;
      });
  }
}

export default new Numbers();
