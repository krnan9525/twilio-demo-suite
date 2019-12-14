export class Endpoints {
  host =
    // ? 'https://marknanyang.com/call-router/api'
    process.env.NODE_ENV === 'production'
      ? 'http://marknanyang.com:12222'
      : 'http://localhost:3000';

  activeNumbers = {
    get: '/api/v1/users/allLocalNumbers'
  };

  call = {
    post: '/api/v1/calls',
    get: '/api/v1/calls'
  };
}

export default new Endpoints();