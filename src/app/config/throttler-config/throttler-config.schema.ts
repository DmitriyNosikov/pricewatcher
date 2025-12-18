import { IsNumber, ValidationError, validateOrReject } from 'class-validator';
import { Logger } from '@nestjs/common';

import { ConfigMessages } from '../config.constant';

export const ThrottlerConfigEnum = {
  THROTTLER_TTL: 'throttlerTTL',
  THROTTLER_LIMIT: 'throttlerLimit'
} as const;

export interface ThrottlerConfigInterface {
  [ThrottlerConfigEnum.THROTTLER_TTL]: number,
  [ThrottlerConfigEnum.THROTTLER_LIMIT]: number
}

export class ThrottlerConfigSchema implements ThrottlerConfigInterface {
  private readonly loggerPrefix = '[Throttler Config] --->';
  private readonly logger: Logger = new Logger(ThrottlerConfigSchema.name);

  @IsNumber()
  throttlerTTL: number;

  @IsNumber()
  throttlerLimit: number;

  async validate() {
    return await validateOrReject(this).catch((errors) => {
      this.logger.log(`${this.loggerPrefix} ${ConfigMessages.ERROR.VALIDATION}:`, errors);

      throw new ValidationError();
    });
  }
}
