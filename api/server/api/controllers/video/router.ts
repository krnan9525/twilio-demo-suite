import express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/newRoomClientToken', controller.getNewRoomClientTokenForVoice)
  .get('/joiningRoomClientToken', controller.getJoiningRoomClientTokenForVoice);
