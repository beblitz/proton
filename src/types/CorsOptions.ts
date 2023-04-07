interface CorsOptions {
  origins?: string[];
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  preflightMaxAge?: number;
}

export default CorsOptions;
