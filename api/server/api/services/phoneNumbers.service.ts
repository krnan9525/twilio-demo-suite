import axios from 'axios';
import { publicTwilioEndpoint2010 } from '../consts';

export type PhoneNumberType = 'Mobile' | 'Local' | 'TollFree';

interface AvailableCountryInterface {
  country_code: string;
  country: string;
  uri: string;
  beta: boolean;
  subresource_uris: {
    local?: string;
    mobile?: string;
    toll_free?: string;
  };
}

interface AvailablePhoneInterface {
  iso_country: string;
  phone_number: string;
  capabilities: {
    SMS: string;
    MMS: string;
    voice?: string;
  };
}

interface AvailablePhoneNumbersCountriesResponse {
  data: {
    countries: [AvailableCountryInterface];
  };
}

interface AvailablePhoneNumbersResponse {
  data: {
    available_phone_numbers: [AvailablePhoneInterface];
  };
}

class PhoneNumbersService {
  private getAvailablePhoneTypes(urls) {
    const result = [];
    if (urls.local) {
      result.push('Local');
    }
    if (urls.mobile) {
      result.push('Mobile');
    }
    if (urls.toll_free) {
      result.push('TollFree');
    }

    return result;
  }

  public getAvailableCountries(accountSid: string, accessToken: string) {
    return axios
      .get(
        `${publicTwilioEndpoint2010}Accounts/${accountSid}/AvailablePhoneNumbers.json`,
        {
          auth: {
            username: accountSid,
            password: accessToken
          }
        }
      )
      .then((response: AvailablePhoneNumbersCountriesResponse) =>
        response.data.countries
          .map(country => ({
            countryCode: country.country_code,
            country: country.country,
            supportedTypes: this.getAvailablePhoneTypes(
              country.subresource_uris
            )
          }))
          .sort((a, b) =>
            a.countryCode === 'US' || a.country < b.country ? -1 : 1
          )
          .sort(a => (a.countryCode === 'US' ? -1 : 0))
      );
  }

  public getAvailableNumbers(
    accountSid: string,
    accessToken: string,
    country: string,
    type: PhoneNumberType
  ) {
    return axios
      .get(
        `${publicTwilioEndpoint2010}Accounts/${accountSid}/AvailablePhoneNumbers/${country}/${type}.json`,
        {
          auth: {
            username: accountSid,
            password: accessToken
          }
        }
      )
      .then((response: AvailablePhoneNumbersResponse) =>
        response.data.available_phone_numbers.map(number => ({
          isoCountry: number.iso_country,
          number: number.phone_number,
          voiceEnabled: number.capabilities.voice,
          smsEnabled: number.capabilities.SMS,
          mmsEnabled: number.capabilities.MMS
        }))
      );
  }

  public purchasePhoneNumber(
    accountSid: string,
    accessToken: string,
    phoneNumber: string
  ) {
    return axios.post(
      `${publicTwilioEndpoint2010}Accounts/${accountSid}/IncomingPhoneNumbers.json`,
      `PhoneNumber=${phoneNumber}`,
      {
        auth: {
          username: accountSid,
          password: accessToken
        }
      }
    );
  }
}
export default new PhoneNumbersService();
