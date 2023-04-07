import { readdirSync, statSync } from 'fs-extra';
import ProtonError from './ProtonError';

class Scanner {
  public static async scan(extension: string): Promise<void> {
    await this.readDir(process.cwd(), extension);
  }

  private static async readDir(path: string, extension: string): Promise<void> {
    if (!path.includes('node_modules')) {
      readdirSync(path).forEach(file => {
        const filePath = `${path}/${file}`;
        const fileStat = statSync(filePath);

        if (fileStat.isDirectory()) {
          this.readDir(filePath, extension);
        } else if (fileStat.isFile()) {
          this.readFile(filePath, extension);
        }
      });
    }
  }

  private static fileIsInTheRightDir(
    file: string,
    dir: string,
    ext: string
  ): boolean {
    return (
      file.endsWith(`.${ext}.js`) ||
      (file.endsWith(`.${ext}.ts`) && dir === `${ext}s`)
    );
  }

  private static async readFile(file: string, ext: string): Promise<void> {
    if (file.endsWith(`.${ext}.js`) || file.endsWith(`.${ext}.ts`)) {
      const fileName = file.split('/').pop();
      const dirName = file.split('/').slice(-2)[0];

      ProtonError.throwIf(
        !this.fileIsInTheRightDir(file, dirName, ext),
        `File ${fileName} is in the wrong directory. It should be in the ${ext}s directory, so it'll be ignored. Please move it to the right directory.`
      );

      await import(file)
        .then(_file => {
          if (_file.default.init) {
            _file.default.init();
          }
        })
        .catch(e => {
          console.log(e);
          ProtonError.throw(
            `An error ocurred while attempting to load ${fileName}, so it'll be ignored. Are you sure that you exported the class correctly?`
          );
        });
    }
  }
}

export default Scanner;
