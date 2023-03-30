import protonConfig from '../config/proton-config';
import Server from '../core/Server';
import Container from '../utils/container';

function ProtonApplication() {
  return function (target: any): void {
    const server = new Server();

    const app = new target();

    Reflect.defineProperty(app, 'proton:server', {
      value: server,
      writable: false,
      enumerable: false,
      configurable: false,
    });

    Reflect.defineProperty(app, 'proton:config', {
      value: protonConfig,
      writable: false,
      enumerable: false,
      configurable: false,
    });

    app.start = async function (): Promise<void> {
      await server.start();
    };

    Container.set('app', app);
  };
}

export default ProtonApplication;
