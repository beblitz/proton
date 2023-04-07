import { Next, ProtonConfig, Request, Response } from '../types';
import Route from '../types/Route';
import cache from './cache';
import Container from './container';
import logger from './logger';

const loadCache = (
  route: Route & { status: number },
  req: Request,
  res: Response,
  next: Next
) => {
  const _cache = Reflect.getMetadata('cache', route);

  if (_cache) {
    const cacheName = _cache.cacheName;
    const uniqueKey = _cache.options?.uniqueKey;
    const ttl = _cache.options?.ttl;
    const type = _cache.options?.type;

    const key =
      (uniqueKey && `${cacheName}:${cache.parseUniqueKey(uniqueKey, req)}`) ||
      cacheName;

    const alreadyStoraged = cache.get(key);

    const config: ProtonConfig = Container.get('config');

    if (!alreadyStoraged) {
      req.on('end', () => {
        const response = req.get('response');

        console.log(response);

        if (config.application.compiler.verbose) {
          logger.info(
            `Cached ${cacheName} for ${ttl} seconds. Request: ${req.originalUrl}`
          );
        }

        cache.set(key, response, ttl);

        return next();
      });
    } else if (alreadyStoraged && type === 'get') {
      res.status(route.status || 200).json(alreadyStoraged);

      if (config.application.compiler.verbose) {
        logger.info(`Cache hit for ${cacheName}. Request: ${req.originalUrl}`);
      }

      return next();
    }
  }
};

export default loadCache;
