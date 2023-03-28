import express from 'express';
import HttpServer from 'http';
import protonConfig from '../config/proton-config.js';
import logger from '../utils/logger.js';

export default class Server {
  private readonly express: express.Express;
  private server: HttpServer.Server;

  constructor() {
    this.express = express();
  }

  public start(): void {
    this.server = this.express.listen(protonConfig.port, () => {
      logger.imp(
        `Detected Proton Experimental v${protonConfig.proton.version}`
      );
      logger.info(
        `Application ${protonConfig.application.name} started on port ${protonConfig.port}`
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
