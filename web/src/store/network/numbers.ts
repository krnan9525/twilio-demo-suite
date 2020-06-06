import axios from 'axios';
import endpoints from '@/store/network/endpoints';
import validator from '@/util/validator';

export class Numbers {
  getActiveNumbers(accountSid: string, accessToken: string) {
    if (!validator.sidValidator(accountSid)) {
      return Promise.reject(new Error('Account Sid is in wrong format'));
    }
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
