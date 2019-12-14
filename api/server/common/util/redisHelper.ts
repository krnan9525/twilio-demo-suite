const redis = require('redis');
const client = redis.createClient({
  url: process.env.NODE_ENV === 'production'
    ? 'redis://redistogo:df0c0c292b6e7cddbb68635769020c39@dory.redistogo.com:11031'
    : undefined
});
const { promisify } = require('util');
const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);

export class Redis {
  set(key: string, payload: string): Promise<boolean> {
    return redisSet(key, payload)
      .then(() => true);
  }

  get(key: string): Promise<string> {
    return redisGet(key);
  }

}

export default new Redis();
