import CorsOptions from './CorsOptions.js';
import Environment from './Environment.js';

interface ProtonConfig {
  application: {
    name: string;
    version: string;
  };
  port?: number;
  verbose?: boolean;
  helmet?: {
    enabled?: boolean;
    environments?: Environment[];
  };
  cors?: CorsOptions;
  proton?: {
    version?: string;
  };
}

export default ProtonConfig;
