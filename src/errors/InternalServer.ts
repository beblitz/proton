import { Status } from '../enums';
import HttpError from './HttpError';

class InternalServerError extends HttpError {
  constructor(message: string) {
    super(Status.InternalServerError, message);
    this.name = 'InternalServerError';
  }
}

export default InternalServerError;
