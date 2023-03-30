import fs from 'fs-extra';
import path from 'path';
import ProtonConfig from '../types/ProtonConfig';

const settings: ProtonConfig = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'proton.json'), 'utf8')
);

const name = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')
).name;

const version = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')
).version;

const protonVersion = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')
).version;

export default {
  application: {
    name: settings.application?.name || name || 'Proton Application',
    version: settings.application?.version || version || '0.0.0',
  },
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
  proton: {
    version: protonVersion,
  },
} as const as ProtonConfig;
