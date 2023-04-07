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
        environments?: {
          all?: CorsOptions;
          development?: CorsOptions;
          production?: CorsOptions;
          test?: CorsOptions;
          staging?: CorsOptions;
        };
      };
    };
  };
}

export default ProtonConfig;
