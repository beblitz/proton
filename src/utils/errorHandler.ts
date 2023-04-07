import HttpError from '../errors/HttpError';
import { Next, ProtonConfig, Request, Response } from '../types';
import Container from './container';
import logger from './logger';

const errorHandler = (
  err: HttpError,
  _: Request,
  res: Response,
  next: Next
) => {
  if (err instanceof HttpError) {
    const config: ProtonConfig = Container.get('config');

    if (config.application.compiler.verbose) {
      logger.err(err.toString());
    }

    res.status(err.status).json(err.toJSON());
    return next();
  } else {
    return next(err);
  }
};

export default errorHandler;
