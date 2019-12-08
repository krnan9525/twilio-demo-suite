export class Endpoints {
  host =
    process.env.NODE_ENV === 'production'
      ? 'https://marknanyang.com/call-router/api'
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
