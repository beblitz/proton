import CorsOptions from './CorsOptions';
import Environment from './Environment';

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
