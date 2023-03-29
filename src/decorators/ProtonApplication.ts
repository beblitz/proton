import protonConfig from '../config/proton-config';
import Server from '../core/Server';
import Container from '../utils/container';

function ProtonApplication() {
  return function (target: any): void {
    const server = new Server();

    (async () => {
      await server.start().then(() => {
        // scan(`${process.cwd()}`, '.controller');
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
  };
}

export default ProtonApplication;
