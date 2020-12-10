import { NextFunction, Request, Response } from 'express';
import PhoneNumbersService, { PhoneNumberType } from '../../services/phoneNumbers.service';

export class PhoneNumbersController {
  getAvailableCountries(req: Request, res: Response, next: NextFunction): void {
    const { accountSid, accessToken } = req.query;

    PhoneNumbersService.getAvailableCountries(accountSid, accessToken)
      .then(countries => {
        res.json(countries);
      })
      .catch(next);
  }

  getAvailableNumbers(req: Request, res: Response, next: NextFunction): void {
    const { accountSid, accessToken } = req.query;
    const { country, type } = req.params as {country: string, type: PhoneNumberType};

    PhoneNumbersService.getAvailableNumbers(accountSid, accessToken, country, type)
      .then(numbers => {
        res.json(numbers);
      })
      .catch(next);
  }

  purchasePhoneNumber(req: Request, res: Response, next: NextFunction): void {
    const { accountSid, accessToken, phoneNumber } = req.body;

    PhoneNumbersService.purchasePhoneNumber(
      accountSid,
      accessToken,
      phoneNumber
    )
      .then(() => {
          res.status(204);
          res.send();
        }
      )
      .catch(next)
  }
}

export default new PhoneNumbersController();
