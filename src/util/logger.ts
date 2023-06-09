// modules
import {createLogger, format, transports} from 'winston';
import 'winston-daily-rotate-file';

// constants
import {LOG_LEVELS_MAP} from '../constant/logger';

const DATE_LOG_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const ROTATION_LOG_FILE_DATE_PATTERN = 'YYYY-MM-DD';
const ROTATION_LOG_FILE_NAME = 'application-%DATE%.log';
const ROTATION_LOG_DIRECTORY = './logs';

const {combine, timestamp, colorize, json, simple, printf} = format;
const {Console} = transports;

// to be used when writing to a file is enabled
const baseRotationalTransport = {
  datePattern: ROTATION_LOG_FILE_DATE_PATTERN,
  zippedArchive: true,
  filename: ROTATION_LOG_FILE_NAME,
  dirname: ROTATION_LOG_DIRECTORY,
  maxSize: '5m',
  maxFiles: '15d'
};

const errorStackTracerFormat = format((info) => {
  if (info && info.err instanceof Error) {
    return {
      ...info,
      message: `${info.message} ${info.err.stack}`
    };
  } else if (info && info.stack) {
    return {
      ...info,
      message: `${info.message} ${info.stack}`
    };
  }

  return {
    ...info
  };
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customFormat = printf(({level, message, _, timestamp}) => {
  return `${timestamp} ${level}: ${message}`;
});

const customLogger = createLogger({
  format: combine(
    timestamp({
      format: DATE_LOG_FORMAT
    }),
    errorStackTracerFormat(),
    json(),
    customFormat
  ),
  transports: [
    new Console({
      format: combine(
        colorize(),
        simple(),
        errorStackTracerFormat(),
        customFormat
      )
    }),
    new transports.DailyRotateFile(baseRotationalTransport)
  ],
  levels: LOG_LEVELS_MAP
});

export default customLogger;
