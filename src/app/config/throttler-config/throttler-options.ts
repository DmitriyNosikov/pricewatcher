import { ConfigService } from '@nestjs/config';
import { seconds, ThrottlerAsyncOptions } from '@nestjs/throttler';

import { ConfigEnvironment } from '../config.constant';
import { ThrottlerConfigEnum } from './throttler-config.schema';

export function getThrottlerOptions(
  optionSpace: string = ConfigEnvironment.THROTTLER
): ThrottlerAsyncOptions {
  const {
    THROTTLER_TTL,
    THROTTLER_LIMIT,
  } = ThrottlerConfigEnum;

  const envThrottlerTTL = `${optionSpace}.${THROTTLER_TTL}`;
  const envThrottlerLimit = `${optionSpace}.${THROTTLER_LIMIT}`;

  return {
    useFactory: async (configService: ConfigService) => {
      const throttlerTTL = configService.get<number>(envThrottlerTTL) as number;
      const throttlerLimit = configService.get<number>(envThrottlerLimit) as number;
      const errorMessage = `Вы можете отправить не более ${throttlerLimit} запросов в ${throttlerTTL} секунд.`;

      return {
        throttlers: [
          {
            // seconds переводит секунды в миллисекунды
            // https://github.com/nestjs/throttler?tab=readme-ov-file#time-helpers
            ttl: seconds(throttlerTTL),
            limit: throttlerLimit
          }
        ],
        errorMessage: errorMessage
      };
    },
    inject: [ConfigService],
  };
}