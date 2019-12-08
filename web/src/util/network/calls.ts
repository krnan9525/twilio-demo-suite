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
        console.log(res);
        return res.data;
      });
  }
}

export default new Numbers();
