import Server from '../core/Server.js';
import ProtonConfig from './ProtonConfig.js';

interface Application {
  config: ProtonConfig;
  server: Server;
}

export default Application;
