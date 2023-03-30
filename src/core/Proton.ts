import { Application } from '../types';
import Scanner from './Scanner';

class Proton {
  public static async bootstrap(application: Application): Promise<void> {
    await Scanner.scan(`${process.cwd()}`, ['.controller.', '.service.']).then(
      async () => {
        await application.start();
      }
    );
  }
}

export default Proton;
