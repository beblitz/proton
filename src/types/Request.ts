import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  get<T>(key: string): T;
  set<T>(key: string, value: T): void;
}

export default Request;
