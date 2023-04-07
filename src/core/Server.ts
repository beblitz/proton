import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import HttpServer from 'http';
import morgan from 'morgan';
import socket from 'socket.io';
import { Status } from '../enums';
import { ProtonConfig } from '../types';
import Route from '../types/Route';
import Container from '../utils/container';
import errorHandler from '../utils/errorHandler';
import logger from '../utils/logger';
import portResolver from '../utils/portResolver';
import protonContext from '../utils/protonContext';

export default class Server {
  private readonly express: express.Express;
  private _io: socket.Server;
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
    this.express[route.method](
      route.path,
      route.middlewares,
      route.handler,
      errorHandler
    );

    logger.info(`Route [${route.method.toUpperCase()}] ${route.path} added`);
  }

  private setup(): void {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(protonContext);
    this.express.use(express.json());
    this.express.use(express.raw());
    this.express.use(express.text());

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

      this._io = new socket.Server(this.server, {
        cors: {
          origin: corsOptions.origins,
          methods: corsOptions.methods,
          allowedHeaders: corsOptions.allowedHeaders,
          credentials: corsOptions.credentials,
          exposedHeaders: corsOptions.exposedHeaders,
          maxAge: corsOptions.preflightMaxAge,
        },
        path: '/socket.io',
      });
    } else {
      this._io = new socket.Server(this.server, {
        path: '/socket.io',
        cors: {
          origin: '*',
        },
      });
    }
  }

  public get io(): socket.Server {
    return this._io;
  }
}
