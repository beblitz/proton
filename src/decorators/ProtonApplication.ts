import protonConfig from '../config/proton-config';
import Server from '../core/Server';
import Application from '../types/Application';
import Container from '../utils/container';
import scan from '../utils/scan';

export default function ProtonApplication() {
  return function (target: any): typeof target {
    const server = new Server();

    (async () => {
      await server.start().then(() => {
        scan(`${process.cwd()}`, '.controller');
      });
    })();

    const app = new target();

    Reflect.defineProperty(app, 'server', {
      value: server,
      writable: false,
      enumerable: false,
      configurable: false,
    });

    Reflect.defineProperty(app, 'config', {
      value: protonConfig,
      writable: false,
      enumerable: false,
      configurable: false,
    });

    Container.set('app', app);

    return app as Application;
  };
}
