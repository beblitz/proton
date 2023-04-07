import Route, { Method } from '../types/Route';
import loadMiddleware from '../utils/loadMiddleware';

type Options = {
  status?: number;
  path?: string;
  middlewares?: unknown[];
};

function RouteExec(
  method: Method,
  status?: number,
  path?: string,
  middlewares?: unknown[]
): MethodDecorator {
  return function (target: any, propertyKeys: string | symbol) {
    const routes: Route[] = target.constructor.routes || [];

    const route = {
      method,
      path,
      status,
      handler: target[propertyKeys],
      middlewares: [],
    };

    middlewares?.map(m => {
      loadMiddleware(m as string, route);
    });

    routes.push(route);

    target.constructor.routes = routes;
  };
}

export function Get(options?: Options): MethodDecorator {
  return RouteExec('get', options?.status, options?.path, options?.middlewares);
}

export function Post(options?: Options): MethodDecorator {
  return RouteExec(
    'post',
    options?.status,
    options?.path,
    options?.middlewares
  );
}

export function Put(options?: Options): MethodDecorator {
  return RouteExec('put', options?.status, options?.path, options?.middlewares);
}

export function Delete(options?: Options): MethodDecorator {
  return RouteExec('del', options?.status, options?.path, options?.middlewares);
}

export function Patch(options?: Options): MethodDecorator {
  return RouteExec(
    'patch',
    options?.status,
    options?.path,
    options?.middlewares
  );
}
