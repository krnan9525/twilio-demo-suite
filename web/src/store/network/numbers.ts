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
  getCountryList(accountSid: string, accessToken: string) {
    if (!validator.sidValidator(accountSid)) {
      return Promise.reject(new Error('Account Sid is in wrong format'));
    }
    return axios
      .get(endpoints.host + endpoints.availableCountries.get, {
        params: {
          accountSid,
          accessToken
        }
      })
      .then(res => {
        return res.data;
      });
  }
  getNumbersToBuy(
    accountSid: string,
    accessToken: string,
    country: string,
    type: string
  ) {
    if (!validator.sidValidator(accountSid)) {
      return Promise.reject(new Error('Account Sid is in wrong format'));
    }
    return axios
      .get(
        `${endpoints.host}${endpoints.numbersToBuy.get}/${country}/${type}`,
        {
          params: {
            accountSid,
            accessToken
          }
        }
      )
      .then(res => {
        return res.data;
      });
  }
  buyNewNumber(accountSid: string, accessToken: string, number: string) {
    if (!validator.sidValidator(accountSid)) {
      return Promise.reject(new Error('Account Sid is in wrong format'));
    }
    return axios.post(
      `${endpoints.host}${endpoints.purchasePhoneNumber.post}`,
      {
        accountSid,
        accessToken,
        phoneNumber: number
      }
    );
  }
}

export default new Numbers();
