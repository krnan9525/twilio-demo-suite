import axios from "axios";
import { publicTwilioEndpoint2010 } from "../consts";

interface AvailableCountryInterface {
  country_code: string;
  country: string;
  uri: string;
  beta: boolean;
  subresource_uris: {
    local: string;
    mobile?: string;
    toll_free?: string
  }
}

interface AvailablePhoneNumbersResponse {
  data: {
    countries: [AvailableCountryInterface];
  }
}

class PhoneNumberService {
  public getAvailableCountries(accountSid: string, accessToken: string) {
    return axios
      .get(
        `${publicTwilioEndpoint2010}Accounts/${accountSid}/AvailablePhoneNumbers.json`,
        {
          auth: {
            username: accountSid,
            password: accessToken,
          },
        }
      )
      .then((response: AvailablePhoneNumbersResponse) => response.data.countries);
  }
}

export default new PhoneNumberService();
