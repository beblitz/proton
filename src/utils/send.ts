import { Next, Request, Response } from '../types';
import Route from '../types/Route';

const send = (method: () => any, ...args: any[]) => {
  const next = args[0] as Next;

  try {
    method();
    next();
  } catch (err) {
    next(err);
  }
};

export default send;
