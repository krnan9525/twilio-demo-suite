import express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/availableCountries', controller.getAvailableCountries)
  .get('/availableNumbers/:country/:type/', controller.getAvailableNumbers)
  .post('/purchasePhoneNumber', controller.purchasePhoneNumber);
