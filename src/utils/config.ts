import fs from 'fs-extra';
import path from 'path';
import { ProtonConfig } from '../types';
import editor from './editor';
import logger from './logger';
import Container from './container';

const _protonFileName = 'proton.config.json';

const load = async (): Promise<ProtonConfig> => {
  if (!fs.existsSync(path.resolve(process.cwd(), _protonFileName))) {
    await fs
      .readFile(path.resolve(__dirname, '../../base.json'), 'utf8')
      .then(async file => {
        const config = JSON.parse(file);
        const packageJson = JSON.parse(
          fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')
        );

        config.application.name = path.basename(process.cwd());
        config.application.protonVersion = packageJson.version;

        delete config['$schema'];

        await editor.exec(`touch ${_protonFileName}`, process.cwd());

        await fs
          .writeFile(
            path.resolve(process.cwd(), _protonFileName),
            JSON.stringify(config, null, 2)
          )
          .then(() => {
            logger.imp(
              `we noticed that you don't have a ${_protonFileName} file, so we created one for you.`
            );
          });
      });
  }

  const config = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), _protonFileName), 'utf8')
  );

  Container.set('config', config);

  return config;
};

export default {
  load,
} as const;
