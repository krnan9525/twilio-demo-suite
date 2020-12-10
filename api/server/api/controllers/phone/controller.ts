import { NextFunction, Request, Response } from 'express';
import PhoneNumberService from '../../services/phone.service';

export class PhoneController {
  getAvailableCountries(req: Request, res: Response, next: NextFunction): void {
    const { accountSid, accessToken } = req.query;

    PhoneNumberService.getAvailableCountries(accountSid, accessToken)
      .then(countries => {
        res.json(countries);
      })
      .catch(next);
  }
}

export default new PhoneController();
