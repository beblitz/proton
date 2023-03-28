import protonConfig from '../config/proton-config.js';
import Server from '../core/Server.js';
import Container from '../utils/container.js';
import scan from '../utils/scan.js';

export default function ProtonApplication(application?: {
  name?: string;
  version?: string;
}) {
  return function (target: any): any {
    const server = new Server();

    scan(`${process.cwd()}`, '.controller.js');

    class Application extends target {
      constructor(...args: any[]) {
        super(...args);
      }

      public static start(): void {
        server.start();
      }

      public static stop(): void {
        server.stop();
      }

      public static getServer(): Server {
        return server;
      }
    }

    return Application;
  };
}
