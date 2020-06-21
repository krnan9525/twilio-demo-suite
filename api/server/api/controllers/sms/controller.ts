import { NextFunction, Request, Response } from 'express';
import SmsService from '../../services/sms.service';

export class SmsController {
  getAllRecentSms(req: Request, res: Response, next: NextFunction): void {
    const { accountSid, accessToken, pageToken } = req.query;
    SmsService.getSmsByNumber(accountSid, accessToken, {
      pageToken1: pageToken
    })
      .then(sms => {
        res.json(sms);
      })
      .catch(next);
  }

  getSmsByNumber(req: Request, res: Response, next: NextFunction): void {
    const { accountSid, accessToken, pageToken1, pageToken2, to } = req.query;
    const { from } = req.params;
    SmsService.getSmsByNumber(accountSid, accessToken, {
      from,
      pageToken1,
      pageToken2,
      to
    })
      .then(sms => {
        res.json(sms);
      })
      .catch(next);
  }

  sendNewMessage(req: Request, res: Response, next: NextFunction): void {
    const { accountSid, accessToken, messageBody, from, to } = req.body;
    SmsService.createNewMessage({
      accountSid,
      accessToken,
      messageBody,
      from,
      to
    })
      .then(r => res.json(r))
      .catch(next);
  }
}

export default new SmsController();
