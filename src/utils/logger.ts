import { Formats, jetLogger, LoggerModes } from 'jet-logger';

const logger = jetLogger(LoggerModes.Console, '', false, false, Formats.Line);

export default {
  info: (message: string): void => {
    logger.info(message);
  },
  warn: (message: string): void => {
    logger.warn(message);
  },
  err: (message: string): void => {
    logger.err(message);
  },
  imp: (message: string): void => {
    logger.imp(message);
  },
} as const;
