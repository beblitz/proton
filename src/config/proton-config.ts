import fs from 'fs-extra';
import path from 'path';
import ProtonConfig from 'src/types/ProtonConfig.js';

const settings: ProtonConfig = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'proton.json'), 'utf8')
);

export default {
  verbose: settings.verbose || false,
  port: settings.port || 3000,
  cors: {
    origin: settings.cors?.origin || '*',
    methods: settings.cors?.methods || ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: settings.cors?.allowedHeaders || ['Content-Type'],
    exposedHeaders: settings.cors?.exposedHeaders || ['Content-Type'],
    credentials: settings.cors?.credentials || false,
    maxAge: settings.cors?.maxAge || 86400,
  },
  helmet: {
    enabled: settings.helmet?.enabled || true,
    environments: settings.helmet?.environments || ['production'],
  },
} as const as ProtonConfig;
