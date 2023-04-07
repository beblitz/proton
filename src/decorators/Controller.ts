import Server from '../core/Server';
import Route from '../types/Route';
import Container from '../utils/container';
import loadMiddleware from '../utils/loadMiddleware';
import loadRoute from '../utils/loadRoute';

const Controller = (basePath: string) => {
  return (target: any) => {
    Reflect.getMetadataKeys(target).forEach(key => {
      target[key] = Reflect.getMetadata(key, target);
    });

    if (!basePath.startsWith('/')) {
      basePath = `/${basePath}`;
    }

    target.init = () => {
      const server = Container.get<Server>('server');

      target.routes?.forEach((route: Route & { status: number }) => {
        if (route.path && !route.path.startsWith('/')) {
          route.path = `/${route.path}`;
        }

        route.path = `${basePath}${route.path || ''}`;

        route = loadRoute(route, target);

        route.middlewares = route.middlewares.map(middleware => {
          return loadMiddleware(middleware);
        });

        server.addRoute(route);
      });
    };

    return target;
  };
};

export default Controller;
