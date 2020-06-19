import CallsService from '../../services/calls.service';
import { Request, Response, NextFunction } from 'express';
import { ISubscription } from '../../../common/util/push';

export class Controller {
  /**
   * @description get all call logs
   * @param req
   * @param res
   * @param next
   */
  getCalls(req: Request, res: Response, next: NextFunction): void {
    const { accountSid, accessToken, pageToken } = req.query;
    CallsService.getCalls({ accountSid, accessToken }, pageToken)
      .then(r => res.json(r))
      .catch(next);
  }

  /**
   * @description create a new call forwarding
   * @param req
   * @param res
   * @param next
   */
  createNewCall(req: Request, res: Response, next: NextFunction): void {
    const {
      accountSid,
      accessToken,
      connectNumber,
      hostNumber,
      twilioNumber,
      clientInfo
    } = req.body;
    const subscription: ISubscription = clientInfo
      ? {
          endpoint: clientInfo.endpoint,
          keys: {
            p256dh: clientInfo.p256dh,
            auth: clientInfo.auth
          }
        }
      : null;
    CallsService.createNewCall(
      { accountSid, accessToken, connectNumber, hostNumber, twilioNumber },
      subscription
    )
      .then(r => res.json(r))
      .catch(next);
  }

  /**
   * @description this endpoint will be called when the call status is changed
   * @type webhook endpoint -- caller <twilio.com>
   * @param req
   * @param res
   */
  statusChanged(req: Request, res: Response): void {
    const { CallSid, CallDuration, CallStatus } = req.body;
    CallsService.changeStatus(CallSid, CallStatus, CallDuration).then(() =>
      res.json(true)
    );
  }
}
export default new Controller();
