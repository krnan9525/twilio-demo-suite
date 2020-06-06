import axios from 'axios';
import endpoints from '@/store/network/endpoints';

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

export interface ICall {
  sid: string;
}

export interface ICallLogRequest {
  accountSid: string;
  accessToken: string;
  pageToken: string;
}

export class Numbers {
  forwardCall(payload: IForwardCall) {
    return axios
      .post(endpoints.host + endpoints.calls.post, payload)
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

  getCallLog(params: ICallLogRequest) {
    return axios
      .get(endpoints.host + endpoints.calls.get, { params })
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
