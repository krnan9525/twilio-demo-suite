import sendNotification from '../../../common/util/push';
import { Request, Response } from 'express';

export class Controller {
  push(req: Request, res: Response): void {
    const { endpoint, p256dh, auth, payload } = req.body;
    sendNotification({
      endpoint,
      keys: {
        p256dh,
        auth
      }
    }, payload);
    res.send('ok');
  }
}
export default new Controller();
