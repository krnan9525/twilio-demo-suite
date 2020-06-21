import axios, { AxiosResponse } from 'axios';
import endpoints from '@/store/network/endpoints';
import {
  CreateSmsPayloadInterface,
  CreateSmsResponseInterface,
  FetchMessagePayloadInterface,
  FetchMessageResponseInterface
} from '@/store/messages/interfaces';

export class Sms {
  getMessagesForNumber(
    params: FetchMessagePayloadInterface
  ): Promise<FetchMessageResponseInterface> {
    const { from } = params;
    delete params.from;
    return axios
      .get(endpoints.host + endpoints.smsMessagesForNumber.get + `/${from}`, {
        params
      })
      .then((res: AxiosResponse<FetchMessageResponseInterface>) => {
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

  sendNewMessage(
    data: CreateSmsPayloadInterface
  ): Promise<CreateSmsResponseInterface> {
    return axios
      .post(endpoints.host + endpoints.smsMessage.post, data)
      .then((res: AxiosResponse<CreateSmsResponseInterface>) => {
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

export default new Sms();
