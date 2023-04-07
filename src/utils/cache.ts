import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 0,
});

const set = <T>(key: NodeCache.Key, value: T, ttl?: number): void => {
  cache.set(key, value, ttl);
};

const get = <T>(key: NodeCache.Key): T => {
  const value = cache.get<T>(key);

  return value;
};

const del = (key: NodeCache.Key): void => {
  cache.del(key);
};

const removeAllKeysThatIncludes = (args: string): void => {
  const keys = cache.keys();

  const keysToRemove = keys.filter(key => key.includes(args));

  keysToRemove.forEach(key => {
    del(key);
  });
};

const parseUniqueKey = (uniqueKey: string, req: any): string => {
  const [property, key] = uniqueKey.split('.');

  if (property.startsWith('get:')) {
    const propertyKey = property.split(':')[1];

    return req.get(propertyKey)[key];
  }

  return req[property][key];
};

export default cache && {
  set,
  get,
  del,
  removeAllKeysThatIncludes,
  parseUniqueKey,
};
