import cp from 'child_process';
import fs from 'fs-extra';
import { Formats, jetLogger, LoggerModes } from 'jet-logger';
import path from 'path';

const logger = jetLogger(LoggerModes.Console, '', false, false, Formats.Line);

const remove = async location => {
  return new Promise((res, rej) => {
    return fs.remove(location, err => {
      return err ? rej(err) : res();
    });
  });
};

const exec = async (command, location) => {
  return new Promise((res, rej) => {
    return cp.exec(command, { cwd: location }, (err, stdout, stderr) => {
      if (err) {
        logger.err(err);
        return rej(err);
      }
      if (stdout) {
        logger.info(stdout);
      }
      if (stderr) {
        logger.err(stderr);
      }
      return res();
    });
  });
};

const readDir = location => {
  fs.readdirSync(location).forEach(file => {
    const path = `${location}/${file}`;
    const stat = fs.statSync(path);

    if (stat.isDirectory()) {
      readDir(path);
    }

    if (stat.isFile()) {
      readFile(path);
    }
  });
};

const readFile = file => {
  if (file.endsWith('.js')) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        return logger.err(err);
      }

      const result = data.replaceAll('src/', './');

      if (result === data) {
        return;
      }

      fs.writeFile(file, result, 'utf8', err => {
        if (err) {
          return logger.err(err);
        }

        logger.info(`Fixed imports for file: ${file}`);
      });
    });
  }
};

(async () => {
  try {
    await remove('lib');
    await exec('tsc --build tsconfig.json', './');
  } catch (err) {
    logger.err(err);
  }
})();
