import { Next, Request, Response } from '../types';
import Route from '../types/Route';

const loadRoute = (route: Route & { status: number }, target: any) => {
  const originalHandler = route.handler.bind(target);

  route.handler = (req: Request, res: Response, next: Next) => {
    try {
      const response = originalHandler(req, res, next);

      if (response instanceof Promise) {
        response.then((data: any) => {
          if (data) {
            res.status(route.status || 200).send(data);
          }
        });
      } else {
        res.status(route.status || 200).send(response);
      }

      req.set('response', response);

      return next();
    } catch (err) {
      return next(err);
    }
  };

  return route;
};

export default loadRoute;
