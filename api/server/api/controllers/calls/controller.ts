import CallsService from '../../services/calls.service';
import { Request, Response } from 'express';
import {ISubscription} from "../../../common/util/push"

export class Controller {
  /**
   * @description get all calls in process
   * @param req
   * @param res
   */
  getCalls(req: Request, res: Response): void {
    CallsService.getCalls().then(r => res.json(r));
  }

  /**
   * @description create a new call forwarding
   * @param req
   * @param res
   */
  createNewCall(req: Request, res: Response): void {
    const { accountSid, accessToken, connectNumber, hostNumber, twilioNumber, clientInfo } = req.body;
    const subscription: ISubscription = {
      endpoint: clientInfo.endpoint,
      keys: {
        p256dh: clientInfo.p256dh,
        auth: clientInfo.auth
      }
    };
    CallsService.createNewCall({accountSid, accessToken, connectNumber, hostNumber, twilioNumber}, subscription)
      .then(r => res.json(r));
  }

  /**
   * @description this endpoint will be called when the call status is changed
   * @type webhook endpoint -- caller <twilio.com>
   * @param req
   * @param res
   */
  statusChanged(req: Request, res: Response): void {
    const { CallSid, CallDuration, CallStatus } = req.body;
    CallsService.changeStatus(CallSid, CallStatus, CallDuration)
      .then(() => res.json(true))
  }
}
export default new Controller();
