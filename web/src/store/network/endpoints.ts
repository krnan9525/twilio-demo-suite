export class Endpoints {
  host =
    // ? 'https://marknanyang.com/call-router/api'
    process.env.NODE_ENV === 'production'
      ? 'https://calls.api.marknanyang.com'
      : 'http://localhost:3000';

  activeNumbers = {
    get: '/api/v1/users/allLocalNumbers'
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
}

export default new Endpoints();
