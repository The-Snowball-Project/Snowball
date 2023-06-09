const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  HTTP: 3,
  VERBOSE: 4,
  DEBUG: 5,
  SILLY: 6
};

const LOG_LEVELS_MAP = {
  error: LOG_LEVELS.ERROR,
  warn: LOG_LEVELS.WARN,
  info: LOG_LEVELS.INFO,
  http: LOG_LEVELS.DEBUG,
  verbose: LOG_LEVELS.DEBUG,
  debug: LOG_LEVELS.DEBUG,
  silly: LOG_LEVELS.DEBUG
};

export { LOG_LEVELS_MAP };
