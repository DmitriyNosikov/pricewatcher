export const ENV_NAME = 'NODE_ENV';
export const ENV_FILE_PATH = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : `.env.dev`;
export const GLOBAL_API_PREFIX = 'api';