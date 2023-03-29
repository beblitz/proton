import protonConfig from '../config/proton-config.js';
import Server from '../core/Server.js';
import Application from '../types/Application.js';
import Container from '../utils/container.js';
import scan from '../utils/scan.js';

export default function ProtonApplication() {
  return function (target: any): typeof target {
    const server = new Server();

    (async () => {
      await server.start().then(() => {
        scan(`${process.cwd()}`, '.controller.js');
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
