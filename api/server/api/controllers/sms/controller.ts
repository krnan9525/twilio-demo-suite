import { NextFunction, Request, Response } from 'express';
import SmsService from '../../services/sms.service';

export class SmsController {
  // getAllSms(req: Request, res: Response): void {
  //   const { accountSid, accessToken, pageToken } = req.query;
  //   LoginService.verifyToken({ accessToken, accountSid })
  //     .then(() => {
  //       res.status(204);
  //       res.send();
  //     })
  //     .catch(() => {
  //       res.status(403);
  //       res.send();
  //     });
  // }

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
}

export default new SmsController();
