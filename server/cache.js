import logger from './logger';
import { Receptacle } from './peerDependencies';

class Cache {
  constructor() {
    this.receptacle = new Receptacle({ max: Cache.MAX_ITEMS });
  }
  setPage(url, head, body, hash) {
    logger.debug('cache page:', url);
    this.receptacle.set(url, { type: 200, head, body, hash }, Cache.DEFAULT_TTL);
  }
  setRedirect(url, location) {
    logger.debug('cach redirect:', url);
    this.receptacle.set(url, { type: 301, location }, Cache.DEFAULT_TTL);
  }
  setNotFound(url) {
    logger.debug('cache notfound:', url);
    this.receptacle.set(url, { type: 404 }, Cache.DEFAULT_TTL);
  }
  has(url) {
    return this.receptacle.has(url);
  }
  get(url) {
    return this.receptacle.get(url);
  }
}
// 1k pages are cached
// eslint-disable-next-line no-restricted-properties
Cache.MAX_ITEMS = Math.pow(2, 10);
// TTL set to 1day
Cache.DEFAULT_TTL = { ttl: 1000 * 60 * 60 * 24 };
const cache = new Cache();
export default cache;
