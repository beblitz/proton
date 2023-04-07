import express, { NextFunction, Request, Response } from 'express';
import HttpServer from 'http';
import logger from '../utils/logger';
import portResolver from '../utils/portResolver';
import { ProtonConfig } from '../types';
import Container from '../utils/container';
import Route from '../types/Route';

export default class Server {
  private readonly express: express.Express;
  private server: HttpServer.Server;
  private protonConfig: ProtonConfig;

  constructor() {
    this.express = express();
    this.protonConfig = Container.get('config');
  }

  public async start(callback?: () => void): Promise<void> {
    const port = await portResolver.getNextAvailablePort(
      this.protonConfig.application.server.port
    );

    this.server = this.express.listen(port, () => {
      if (callback) callback();

      logger.imp(
        `Application ${this.protonConfig.application.name} started on port ${port}`
      );
    });

    Container.set('server', this);
  }

  public stop(): void {
    if (!this.server) return;

    this.server.close(() => {
      logger.info(`Application ${this.protonConfig.application.name} stopped`);
    });
  }

  public addRoute(route: Route): void {
    this.express[route.method](route.path, route.middlewares, route.handler);

    logger.info(`Route [${route.method.toUpperCase()}] ${route.path} added`);
  }
}
