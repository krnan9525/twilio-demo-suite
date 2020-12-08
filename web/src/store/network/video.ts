import axios, { AxiosResponse } from 'axios';
import endpoints from '@/store/network/endpoints';
import { AuthInterface } from '@/store/sharedState';

export interface GetNewClientParamsInterface {
  accountSid: string;
  apiKey: string;
  apiSecret: string;
}

export interface GetNewClientResponseInterface {
  identity: string;
  token: string;
  room: string;
}

export class Video {
  getNewRoomClientToken(params: GetNewClientParamsInterface) {
    return axios
      .get(endpoints.host + endpoints.videoNewRoomClientToken.get, {
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

export default new Video();
