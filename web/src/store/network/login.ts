import axios, { AxiosResponse } from 'axios';
import endpoints from '@/store/network/endpoints';
import validator from '@/util/validator';
import { AuthInterface } from '@/store/sharedState';

export interface NewApiKeyResponseInterface {
  sid: string;
  secret: string;
}

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
  generateNewApiKey(data: AuthInterface) {
    return axios
      .post(endpoints.host + endpoints.createApiKey.post, data)
      .then((res: AxiosResponse<NewApiKeyResponseInterface>) => {
        return res.data;
      })
      .catch(e => {
        if (e.response?.data?.errors?.length > 0) {
          const errors = e.response.data.errors;
          throw new Error(errors[0].message);
        }
        throw e;
      });
  }
}

export default new Login();
