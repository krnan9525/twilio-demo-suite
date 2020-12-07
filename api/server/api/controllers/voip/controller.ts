import { Request, Response } from 'express';
import VoipService from '../../services/voip.service';

export class Controller {
  createTwiMLApp(req: Request, res: Response): void {
    const { accountSid, accessToken } = req.body;
    VoipService.createTwiMLApp(accountSid, accessToken)
      .then(r => res.json(r))
      .catch(e => res.status(400).send(e.messsge));
  }
  twiMLAppResponse(req: Request, res: Response): void {
    const { From, To } = req.body;
    VoipService.getTwiMlResponse(From, To)
      .then(r => res.send(r))
      .catch(e => res.status(400).send(e.messsge));
  }
  getClientTokenForVoip(req: Request, res: Response): void {
    const { apiKey, apiSecret, twiMlAppSid, accountSid } = req.query;
    VoipService.getClientTokenForVoip(
      apiKey,
      apiSecret,
      twiMlAppSid,
      accountSid
    )
      .then(r => res.json(r))
      .catch(e => res.status(400).send(e.messsge));
  }
}
export default new Controller();
