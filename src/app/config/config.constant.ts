export const DEFAULT_PORT = 5000;

export const PORT = {
  MIN: 0,
  MAX: 65535
};

export const EnvTypes = {
  DEV: 'dev',
  PROD: 'prod'
} as const;

export const ConfigEnvironment = {
  APP: 'app',
  JWT: 'jwt',
  PG: 'pg',
  LOGGER: 'logger',
  THROTTLER: 'throttler',
  TELEGRAM: 'telegram',
} as const;

export const ConfigMessages = {
  ERROR: {
    VALIDATION: 'Ошибка валидации переменных окружения'
  }
} as const;
