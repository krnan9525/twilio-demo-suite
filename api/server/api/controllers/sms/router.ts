import express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/message/:from', controller.getSmsByNumber)
  .get('/message', controller.getAllRecentSms);
