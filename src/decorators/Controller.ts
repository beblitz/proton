import Server from '../core/Server';
import { Next, Request, Response } from '../types';
import Route from '../types/Route';
import Container from '../utils/container';
import registerDependencies from '../utils/registerDependencies';

function Controller(basePath: string) {
  return function (target: any) {
    const routes: (Route & { status: number })[] = target.routes || [];

    registerDependencies(target);

    if (!basePath.startsWith('/')) {
      basePath = `/${basePath}`;
    }

    target.init = () => {
      const server = Container.get<Server>('server');

      routes.forEach(route => {
        if (route.path && !route.path.startsWith('/')) {
          route.path = `/${route.path}`;
        }

        route.path = `${basePath}${route.path || ''}`;

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

            next();
          } catch (err) {
            next(err);
          }
        };

        server.addRoute(route);
      });
    };

    return target;
  };
}

export default Controller;
