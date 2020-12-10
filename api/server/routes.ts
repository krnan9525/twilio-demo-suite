import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import callsRouter from './api/controllers/calls/router';
import usersRouter from './api/controllers/users/router';
import loginRouter from './api/controllers/login/router';
import smsRouter from './api/controllers/sms/router';
import voipRouter from './api/controllers/voip/router';
import videoRouter from './api/controllers/video/router';
import phoneRouter from './api/controllers/phone/router';

export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/calls', callsRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/login', loginRouter);
  app.use('/api/v1/sms', smsRouter);
  app.use('/api/v1/voip', voipRouter);
  app.use('/api/v1/video', videoRouter);
  app.use('/api/v1/phone', phoneRouter);
}
