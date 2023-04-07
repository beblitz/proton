import { RequestHandler } from 'express';
import { Status } from '../enums';

export type Method = 'get' | 'post' | 'put' | 'del' | 'patch';

interface Route {
  method: Method;
  path: string;
  handler: RequestHandler;
  status?: Status;
  middlewares?: RequestHandler[];
}

export default Route;
