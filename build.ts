import cp from 'child_process';
import fs from 'fs-extra';
import { Formats, jetLogger, LoggerModes } from 'jet-logger';
import path from 'path';

const logger = jetLogger(LoggerModes.Console, '', false, false, Formats.Line);

const remove = async (location: string): Promise<void> => {
  return new Promise((res, rej) => {
    return fs.remove(location, err => {
      return err ? rej(err) : res();
    });
  });
};

const exec = async (command: string, location: string): Promise<void> => {
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

(async () => {
  try {
    await remove('lib');
    await exec('tsc --build tsconfig.json', './');
  } catch (err) {
    logger.err(err);
  }
})();
