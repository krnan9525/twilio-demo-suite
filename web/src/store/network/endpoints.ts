export class Endpoints {
  host =
    process.env.NODE_ENV === 'production'
      ? 'https://calls.api.marknanyang.com'
      : 'http://localhost:3000';

  webLocation =
    process.env.NODE_ENV === 'production'
      ? 'https://calls.marknanyang.com'
      : 'http://localhost:8080';

  activeNumbers = {
    get: '/api/v1/users/allLocalNumbers'
  };

  availableCountries = {
    get: '/api/v1/phoneNumbers/availableCountries'
  };

  numbersToBuy = {
    get: '/api/v1/phoneNumbers/availableNumbers'
  };

  purchasePhoneNumber = {
    post: '/api/v1/phoneNumbers/purchasePhoneNumber'
  };

  calls = {
    post: '/api/v1/calls',
    get: '/api/v1/calls'
  };

  login = {
    post: '/api/v1/login'
  };

  smsMessagesForNumber = {
    get: '/api/v1/sms/message'
  };

  smsMessage = {
    post: '/api/v1/sms/message'
  };

  createApiKey = {
    post: '/api/v1/users/createApiKey'
  };

  twiMlApp = {
    post: '/api/v1/voip/twiml-app'
  };

  voipClientToken = {
    get: '/api/v1/voip/clientToken'
  };

  videoNewRoomClientToken = {
    get: '/api/v1/video/newRoomClientToken'
  };

  videoJoiningRoomClientToken = {
    get: '/api/v1/video/joiningRoomClientToken'
  };
}

export default new Endpoints();
