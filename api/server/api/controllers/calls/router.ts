import express from 'express';
import controller from './controller'
export default express.Router()
  .get('/', controller.getCalls)
  .post('/', controller.createNewCall)
  .post('/status-changed', controller.statusChanged)
