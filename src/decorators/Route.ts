import { Status } from '../enums';
import Route, { Method } from '../types/Route';

type Options = {
  status?: Status;
  path?: string;
  middlewares?: unknown[];
};

const RouteExec = (
  method: Method,
  status?: number,
  path?: string,
  middlewares?: unknown[]
): MethodDecorator => {
  return (target: any, propertyKeys: string | symbol) => {
    const routes: Route[] =
      Reflect.getMetadata('routes', target.constructor) || [];

    const route = {
      method,
      path,
      status,
      handler: target[propertyKeys],
      middlewares: middlewares || [],
    };

    routes.push(route as Route);

    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

export const Get = (options?: Options): MethodDecorator => {
  return RouteExec('get', options?.status, options?.path, options?.middlewares);
};

export const Post = (options?: Options): MethodDecorator => {
  return RouteExec(
    'post',
    options?.status,
    options?.path,
    options?.middlewares
  );
};

export const Put = (options?: Options): MethodDecorator => {
  return RouteExec('put', options?.status, options?.path, options?.middlewares);
};

export const Delete = (options?: Options): MethodDecorator => {
  return RouteExec('del', options?.status, options?.path, options?.middlewares);
};

export const Patch = (options?: Options): MethodDecorator => {
  return RouteExec(
    'patch',
    options?.status,
    options?.path,
    options?.middlewares
  );
};
