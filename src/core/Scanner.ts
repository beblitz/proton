import { readdirSync, statSync } from 'fs-extra';
import logger from '../utils/logger';
import { container } from 'tsyringe';

class Scanner {
  public static modules: number;

  public static async scan(path: string, extensions: string[]): Promise<void> {
    logger.warn(`
      Scanning for controllers, services and middlewares, please do not try to use the server until this process is finished.
    `);

    await this.readDir(path, extensions).then(() => {
      logger.info(
        `Finished scanning, ${this.modules} ${
          this.modules > 1
            ? 'modules'
            : this.modules === 0
            ? 'modules'
            : 'module'
        } were found.`
      );
    });
  }

  private static async readDir(
    path: string,
    extensions: string[]
  ): Promise<void> {
    readdirSync(path).forEach(file => {
      const filePath = `${path}/${file}`;
      const fileStat = statSync(filePath);

      if (fileStat.isDirectory()) {
        this.readDir(filePath, extensions);
      } else if (fileStat.isFile()) {
        this.readFile(filePath, extensions);
      }
    });
  }

  private static async readFile(
    file: string,
    extensions: string[]
  ): Promise<void> {
    extensions.map(extension => {
      if (file.includes(extension)) {
        import(file).then(file => {
          try {
            container.resolve(file.default);
            if (file.default.load) {
              file.default.load();
            }

            this.modules++;
          } catch (e) {
            logger.err(`
              Attempted to load ${file.default.name}, but it was not found in the container. Did you forget to register it?
            `);
          }
        });
      }
    });
  }
}

export default Scanner;
