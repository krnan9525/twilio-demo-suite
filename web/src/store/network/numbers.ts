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
    //todo: implement this
    return Promise.resolve([
      {
        country: 'United States',
        countryCode: 'US',
        supportedTypes: ['local']
      },
      {
        country: 'Ireland',
        countryCode: 'IE',
        supportedTypes: ['mobile', 'toll_free']
      }
    ]);
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
    //todo: implement this
    return Promise.resolve([
      {
        isoCountry: 'US',
        number: '+17866611346',
        voiceEnabled: true,
        smsEnabled: false,
        mmsEnabled: false
      },
      {
        isoCountry: 'US',
        number: '+17866611347',
        voiceEnabled: true,
        smsEnabled: false,
        mmsEnabled: true
      }
    ]);
  }
  buyNewNumber(accountSid: string, accessToken: string, number: string) {
    if (!validator.sidValidator(accountSid)) {
      return Promise.reject(new Error('Account Sid is in wrong format'));
    }
    //todo: implement this
    return Promise.resolve();
  }
}

export default new Numbers();
