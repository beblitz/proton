import protonConfig from '../config/proton-config.js';
import Server from '../core/Server.js';
import Container from '../utils/container.js';

export default function ProtonApplication(application?: {
  name?: string;
  version?: string;
}) {
  return function (target: any): any {
    const server = new Server();
    class Application extends target {
      private server: Server;
      private name: string;
      private version: string;

      constructor(...args: any[]) {
        super(...args);
        this.server = server;
        this.name = application?.name || protonConfig.application.name;
        this.version = application?.version || protonConfig.application.version;

        this.start();
      }

      public start(): void {
        this.server.start();
      }

      public stop(): void {
        this.server.stop();
      }

      public getName(): string {
        return this.name;
      }

      public getVersion(): string {
        return this.version;
      }

      public getServer(): Server {
        return this.server;
      }
    }

    return Application;
  };
}
