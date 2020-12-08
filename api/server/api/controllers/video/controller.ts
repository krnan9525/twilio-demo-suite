import { Request, Response } from 'express';
import VideoService from '../../services/video.service';

export class Controller {
  getNewRoomClientTokenForVoice(req: Request, res: Response): void {
    VideoService.getNewRoomClientTokenForVoice(req.query)
      .then(r => res.json(r))
      .catch(e => res.status(400).send(e.messsge));
  }
  getJoiningRoomClientTokenForVoice(req: Request, res: Response): void {
    const { room, password, name } = req.query;
    VideoService.getJoiningRoomClientTokenForVoice(room, password, name)
      .then(r => res.json(r))
      .catch(e => res.status(400).send(e.messsge));
  }
}
export default new Controller();
