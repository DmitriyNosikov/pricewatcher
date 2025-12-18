import { Logger } from '@nestjs/common';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidationError,
  validateOrReject,
} from 'class-validator';

import { ConfigMessages, DEFAULT_PORT, PORT } from './config.constant';

export const ConfigEnum = {
  HOST: 'host',
  PORT: 'port',
  LOG_LVL: 'logLVL',
  CORS_ACCESS_ENABLED_URLS: 'corsAccessEnabledURLs',
} as const;

export interface ConfigInterface {
  [ConfigEnum.HOST]: string;
  [ConfigEnum.LOG_LVL]: string;
  [ConfigEnum.PORT]: number;
  [ConfigEnum.CORS_ACCESS_ENABLED_URLS]: string;
}

export class ConfigSchema implements ConfigInterface {
  private readonly loggerPrefix = '[App Config] --->';
  private readonly logger: Logger = new Logger(ConfigSchema.name);

  @IsString()
  host: string;

  @IsString()
  logLVL: string;

  @IsNumber()
  @Max(PORT.MAX)
  @Min(PORT.MIN)
  @IsOptional()
  port: number = DEFAULT_PORT;

  @IsString()
  corsAccessEnabledURLs: string;

  async validate() {
    return await validateOrReject(this).catch((errors) => {
      this.logger.log(`${this.loggerPrefix} ${ConfigMessages.ERROR.VALIDATION}: `, errors);

      throw new ValidationError();
    });
  }
}
