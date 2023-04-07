import express from 'express';
import HttpServer from 'http';
import { ProtonConfig } from '../types';
import Route from '../types/Route';
import Container from '../utils/container';
import logger from '../utils/logger';
import portResolver from '../utils/portResolver';
import errorHandler from '../utils/errorHandler';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { Status } from '../enums';

export default class Server {
  private readonly express: express.Express;
  private server: HttpServer.Server;
  private protonConfig: ProtonConfig;

  constructor() {
    this.express = express();
    this.protonConfig = Container.get('config');
  }

  public async start(callback?: () => void): Promise<void> {
    this.setup();

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

  private setup(): void {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.use(express.raw());
    this.express.use(express.text());
    this.express.use(errorHandler);

    if (this.protonConfig.application.server.middlewares.helmet.enabled) {
      this.protonConfig.application.server.middlewares.helmet.environments.map(
        env => {
          if (env === process.env.NODE_ENV) {
            this.express.use(helmet());
          }
        }
      );
    }

    if (this.protonConfig.application.server.middlewares.morgan.enabled) {
      this.protonConfig.application.server.middlewares.morgan.environments.map(
        env => {
          if (env === process.env.NODE_ENV) {
            this.express.use(morgan(env === 'production' ? 'combined' : 'dev'));
          }
        }
      );
    }

    if (this.protonConfig.application.server.cors.enabled) {
      const corsOptions = {
        ...this.protonConfig.application.server.cors.options,
      };

      this.express.use(
        cors({
          origin: corsOptions.origins,
          methods: corsOptions.methods,
          allowedHeaders: corsOptions.allowedHeaders,
          exposedHeaders: corsOptions.exposedHeaders,
          credentials: corsOptions.credentials,
          maxAge: corsOptions.preflightMaxAge,
          optionsSuccessStatus: Status.Ok,
          preflightContinue: false,
        })
      );
    }
  }
}
