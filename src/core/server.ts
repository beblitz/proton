import express from 'express';

export default class Server {
  private readonly instance: express.Express;

  constructor() {
    this.instance = express();
  }

  public start() {}
}
