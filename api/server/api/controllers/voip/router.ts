import express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/twiml-app', controller.createTwiMLApp)
  .post('/twiml-app/response', controller.twiMLAppResponse)
  .get('/clientToken', controller.getClientTokenForVoip);
