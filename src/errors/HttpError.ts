import { Status } from '../enums';

class HttpError extends Error {
  public status: Status;

  constructor(status: Status, message: string) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }

  public static throw(status: Status, message: string): never {
    throw new HttpError(status, message);
  }

  public static throwIf(
    status: Status,
    condition: boolean,
    message: string
  ): void {
    if (condition) {
      throw new HttpError(status, message);
    }
  }

  public static throwIfNot(
    status: Status,
    condition: boolean,
    message: string
  ): void {
    if (!condition) {
      throw new HttpError(status, message);
    }
  }

  public static throwIfNull(status: Status, value: any, message: string): void {
    if (value === null) {
      throw new HttpError(status, message);
    }
  }

  public static throwIfUndefined(
    status: Status,
    value: any,
    message: string
  ): void {
    if (value === undefined) {
      throw new HttpError(status, message);
    }
  }

  public static throwIfNullOrUndefined(
    status: Status,
    value: any,
    message: string
  ): void {
    if (value === null || value === undefined) {
      throw new HttpError(status, message);
    }
  }

  public toString(): string {
    return `[${this.status}] - ${this.name} - ${this.message}`;
  }

  public toJSON(): Object {
    return {
      status: this.status,
      name: this.name,
      message: this.message,
    };
  }
}

export default HttpError;
