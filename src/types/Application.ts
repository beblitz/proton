import Server from '../core/Server';
import ProtonConfig from './ProtonConfig';

interface Application {
  config?: ProtonConfig;
  server?: Server;
  start?: () => Promise<void>;
}

export default Application;
