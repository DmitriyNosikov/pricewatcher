import { ConfigService } from '@nestjs/config';
import { WinstonModuleAsyncOptions, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';

import { ConfigEnum } from './config.schema';
import { EnvTypes } from './config.constant';
import { ENV_NAME } from '@core/app.constant';

// Уровень логирования
const SERVICE_NAME = 'price-watcher';
const DEFAULT_LOG_LVL = 'info';
const DEFAULT_NODE_ENV = EnvTypes.DEV;

const logLVLSEnum = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const;

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
} as const;


export function getLoggerOption(): WinstonModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      const logLVL: string = configService.get<string>(ConfigEnum.LOG_LVL) || DEFAULT_LOG_LVL;
      const nodeEnv: string = configService.get<string>(ENV_NAME) || DEFAULT_NODE_ENV;

      const colorize = (nodeEnv === EnvTypes.DEV)
        ? nestWinstonModuleUtilities.format.nestLike('WINSTON', {
          colors: true,
          prettyPrint: true,
          processId: true,
          appName: true
        })
        : format.json();

      const consoleTransport = new transports.Console({
        level: logLVL,
        format: format.combine(
          format.timestamp(),
          colorize
        ),
      });

      const rotateFileTransport: DailyRotateFile = new transports.DailyRotateFile({
        level: 'debug',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        dirname: 'dist/app/logs',
        format: format.combine(
          format.timestamp(),
          format.json(),
        ),
      });


      return {
        defaultMeta: {
          service: SERVICE_NAME,
        },
        levels: logLVLSEnum,
        transports: [
          consoleTransport,
          rotateFileTransport
        ],
      };
    },
    inject: [ConfigService],
  }
}