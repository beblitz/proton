import { RequestHandler } from 'express';

interface Middleware {
  execute: RequestHandler;
}

export default Middleware;
