import axios from 'axios';
import { publicApiEndpoint } from '../consts';

class LoginService {
  /**
   * @description verify token and return 204 / 403
   * @param accountSid
   * @param accessToken
   */
  public verifyToken({ accountSid, accessToken }): Promise<void> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${publicApiEndpoint}Credentials/PublicKeys`, {
          auth: {
            username: accountSid,
            password: accessToken
          }
        })
        .then(() => resolve())
        .catch(() => reject());
    });
  }
}

export default new LoginService();
