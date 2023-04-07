import ProtonError from '../core/ProtonError';
import { Next, Request, Response } from '../types';
import Middleware from '../types/Middleware';
import Container from './container';

const loadMiddleware = (middleware: any) => {
  try {
    const _middleware = Container.get<Middleware>(middleware);

    const originalHandler = _middleware.execute.bind(_middleware);

    _middleware.execute = (req: Request, res: Response, next: Next) => {
      try {
        originalHandler(req, res, next);
        next();
      } catch (err) {
        next(err);
      }
    };

    return _middleware.execute;
  } catch (err) {
    ProtonError.throwIf(err, `Middleware ${middleware.name} is not registered`);
  }
};

export default loadMiddleware;
