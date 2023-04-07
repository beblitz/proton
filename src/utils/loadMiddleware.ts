import Middleware from '../types/Middleware';
import Route from '../types/Route';
import Container from './container';
import logger from './logger';

const loadMiddleware = (middleware: string, route: Route): void => {
  try {
    const _middleware = Container.get<Middleware>(middleware);

    if (!_middleware.execute) {
      logger.err(
        `Failed to read execute ${middleware} main function, does it have a @Execute decorator for the main function?`
      );
      throw new Error();
    }

    route.middlewares.push(_middleware.execute.bind(_middleware));
  } catch (e) {
    logger.warn(
      `Error while reading ${middleware} for route [${route.method.toUpperCase()}], it seems that the middleware is not registered, please check your middleware name and make sure that it have the @Middleware decorator`
    );
    throw new Error();
  }
};

export default loadMiddleware;
