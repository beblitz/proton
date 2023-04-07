import cp from 'child_process';
import fs from 'fs-extra';
import logger from './logger';

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
        logger.err(err.toString());
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

export default {
  remove,
  exec,
} as const;
