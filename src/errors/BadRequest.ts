import { Status } from '../enums';
import HttpError from './HttpError';

class BadRequest extends HttpError {
  constructor(message: string) {
    super(Status.BadRequest, message);
    this.name = 'BadRequest';
  }
}

export default BadRequest;
