import Application from '../enums/Application';
import config from '../utils/config';
import logger from '../utils/logger';
import Scanner from './Scanner';
import Server from './Server';

class Proton {
  public static async bootstrap(): Promise<void> {
    await config.load().then(() => {
      new Server().start(async () => {
        logger.warn(
          `Scanning for services, middlewares and controllers, please don't try to use the server until this is done.`
        );

        await Promise.all([
          Scanner.scan(Application.SERVICES),
          Scanner.scan(Application.MIDDLEWARES),
          Scanner.scan(Application.CONTROLLERS),
        ]);
      });
    });
  }
}

export default Proton;
