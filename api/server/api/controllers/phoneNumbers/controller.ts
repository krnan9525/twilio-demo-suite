import { NextFunction, Request, Response } from 'express';
import PhoneNumbersService from '../../services/phoneNumbers.service';

export class PhoneNumbersController {
  getAvailableCountries(req: Request, res: Response, next: NextFunction): void {
    const { accountSid, accessToken } = req.query;

    PhoneNumbersService.getAvailableCountries(accountSid, accessToken)
      .then(countries => {
        res.json(countries);
      })
      .catch(next);
  }
}

export default new PhoneNumbersController();
