import axios from 'axios';
import endpoints from '@/util/network/endpoints';

export interface IForwardCall {
  clientInfo: {
    endpoint: string;
    p256dh: string;
    auth: string;
  };
  accountSid: string;
  accessToken: string;
  twilioNumber: string;
  connectNumber: string;
  hostNumber: string;
}

export class Numbers {
  forwardCall(payload: IForwardCall) {
    return axios
      .post(endpoints.host + endpoints.call.post, payload)
      .then(res => {
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

export default new Numbers();
