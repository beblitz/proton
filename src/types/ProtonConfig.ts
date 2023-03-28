import CorsOptions from './CorsOptions.js';
import Environment from './Environment.js';

interface ProtonConfig {
  port?: number;
  verbose?: boolean;
  helmet?: {
    enabled?: boolean;
    environments?: Environment[];
  };
  cors?: CorsOptions;
}

export default ProtonConfig;
