import { Request, Response } from 'express';
import LoginService from '../../services/login.service';

export class LoginController {
  login(req: Request, res: Response): void {
    const { accountSid, accessToken } = req.body;
    LoginService.verifyToken({ accessToken, accountSid })
      .then(() => {
        res.status(204);
        res.send();
      })
      .catch(() => {
        res.status(403);
        res.send();
      });
  }
}

export default new LoginController();
