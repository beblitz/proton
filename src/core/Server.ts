import express from 'express';
import HttpServer from 'http';
import protonConfig from '../config/proton-config';
import logger from '../utils/logger';
import portResolver from '../utils/portResolver';

export default class Server {
  private readonly express: express.Express;
  private server: HttpServer.Server;

  constructor() {
    this.express = express();
  }

  public async start(): Promise<void> {
    const port = await portResolver.getNextAvailablePort(protonConfig.port);

    this.server = this.express.listen(port, () => {
      logger.imp(
        `Detected Proton Experimental v${protonConfig.proton.version}`
      );
      logger.info(
        `Application ${protonConfig.application.name} started on port ${port}`
      );
    });
  }

  public stop(): void {
    if (!this.server) return;

    this.server.close(() => {
      logger.info(`Application ${protonConfig.application.name} stopped`);
    });
  }
}
