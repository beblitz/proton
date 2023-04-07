import { Next, Request, Response } from '../types';

const protonContext = (req: Request, _: Response, next: Next) => {
  req.set = <T>(key: string, value: T) => {
    Reflect.defineMetadata(key, value, req);
  };
  req.get = <T>(key: string): T => {
    return Reflect.getMetadata(key, req);
  };

  next();
};

export default protonContext;
