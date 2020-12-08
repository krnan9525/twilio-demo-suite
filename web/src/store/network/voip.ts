import axios, { AxiosResponse } from 'axios';
import endpoints from '@/store/network/endpoints';
import { AuthInterface } from '@/store/sharedState';

export interface NewApiKeyResponseInterface {
  sid: string;
  secret: string;
}

export interface NewTwiMlAppResponseInterface {
  sid: string;
  name: string;
}

export interface GetNewClientParamsInterface {
  accountSid: string;
  apiKey: string;
  apiSecret: string;
  twiMlAppSid: string;
}

export interface GetNewClientResponseInterface {
  identity: string;
  token: string;
}

export class Voip {
  generateTwiMlApp(data: AuthInterface) {
    return axios
      .post(endpoints.host + endpoints.twiMlApp.post, data)
      .then((res: AxiosResponse<NewTwiMlAppResponseInterface>) => {
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
  getNewClientToken(params: GetNewClientParamsInterface) {
    return axios
      .get(endpoints.host + endpoints.voipClientToken.get, {
        params
      })
      .then((res: AxiosResponse<GetNewClientResponseInterface>) => res.data)
      .catch(e => {
        if (e.response?.data?.errors?.length > 0) {
          const errors = e.response.data.errors;
          throw new Error(errors[0].message);
        }
        throw e;
      });
  }
}

export default new Voip();
