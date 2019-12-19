import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({
  url:
    process.env.NODE_ENV === 'production'
      ? '***REMOVED***'
      : undefined
});
const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);

export class Redis {
  set(key: string, payload: string): Promise<boolean> {
    return redisSet(key, payload).then(() => true);
  }

  get(key: string): Promise<string> {
    return redisGet(key);
  }
}

export default new Redis();
