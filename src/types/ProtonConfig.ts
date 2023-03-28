import CorsOptions from './CorsOptions';
import Environment from './Environment';

interface ProtonConfig {
  port?: number;
  verbose?: boolean;
  helmet?: Environment[];
  cors?: CorsOptions;
}

export default ProtonConfig;
