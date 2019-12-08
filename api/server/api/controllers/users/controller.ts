import UsersService from '../../services/users.service';
import { Request, Response } from 'express';

export class Controller {
  /**
   * @description get all phone numbers belong to this user
   * @param req
   * @param res
   */
  getNumbers(req: Request, res: Response): void {
    const { accountSid, accessToken } = req.query;

    UsersService.getNumbers(accountSid, accessToken)
      .then(r => res.json(r))
      .catch(e => res.status(400).send(e.messsge));
  }
}
export default new Controller();
