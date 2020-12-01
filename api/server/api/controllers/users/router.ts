import express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/allLocalNumbers', controller.getNumbers)
  .post('/createApiKey', controller.createApiKey);
