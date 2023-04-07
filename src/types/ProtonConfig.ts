import CorsOptions from './CorsOptions';
import Environment from './Environment';

interface ProtonConfig {
  application?: {
    name?: string;
    compiler?: {
      verbose?: boolean;
    };
    server?: {
      port?: number;
      middlewares?: {
        helmet?: {
          enabled?: boolean;
          environments?: Environment[];
        };
        morgan?: {
          enabled?: boolean;
          environments?: Environment[];
        };
      };
      cors?: {
        enabled?: boolean;
        options?: CorsOptions;
      };
    };
  };
}

export default ProtonConfig;
