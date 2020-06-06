import axios from 'axios';
import endpoints from '@/store/network/endpoints';
import validator from '@/util/validator';

export class Login {
  auth(accountSid: string, accessToken: string) {
    if (!validator.sidValidator(accountSid)) {
      return Promise.reject(new Error('Account Sid is in wrong format'));
    }
    return axios.post(endpoints.host + endpoints.login.post, {
      accountSid,
      accessToken
    });
  }
}

export default new Login();
