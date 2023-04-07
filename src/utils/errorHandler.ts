import { ProtonError } from '../core';
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
  ProtonError.throwIf(
    !(err instanceof HttpError),
    'Proton needs an HttpError to handle the error properly, please check the documentation for more information.'
  );

  const config: ProtonConfig = Container.get('config');

  if (config.application.compiler.verbose) {
    logger.err(err.toString());
  }

  res.status(err.status).json(err.toJSON());

  return next();
};

export default errorHandler;
