import { RequestHandler } from 'express';

export type Method = 'get' | 'post' | 'put' | 'del' | 'patch';

interface Route {
  method: Method;
  path: string;
  handler: RequestHandler;
  middlewares?: RequestHandler[];
}

export default Route;
