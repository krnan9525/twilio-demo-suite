import { Request, Response } from 'express';
import VideoService from '../../services/video.service';

export class Controller {
  getClientTokenForVoice(req: Request, res: Response): void {
    const { apiKey, apiSecret, twiMlAppSid, accountSid } = req.query;
    VideoService.getClientTokenForVoice(
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
