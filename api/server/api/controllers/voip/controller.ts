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
    const twiMLFixture = `<Response><Say>Thanks for calling!</Say></Response>`;
    res.send(twiMLFixture);
  }
  getClientTokenForVoip(req: Request, res: Response): void {
    const { apiKey, secret, twiMLAppSid, accountSid } = req.query;
    VoipService.getClientTokenForVoip(apiKey, secret, twiMLAppSid, accountSid)
      .then(r => res.json(r))
      .catch(e => res.status(400).send(e.messsge));
  }
}
export default new Controller();
