import { ConfigType, registerAs } from '@nestjs/config'
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '../config.constant';
import { ThrottlerConfigInterface, ThrottlerConfigSchema } from './throttler-config.schema';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<ThrottlerConfigInterface> {
  const config = plainToClass(ThrottlerConfigSchema, {
    throttlerTTL: parseInt(process.env.THROTTLER_TTL as string, 10),
    throttlerLimit: parseInt(process.env.THROTTLER_LIMIT as string, 10)
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.THROTTLER, async (): PromisifiedConfig => {
  return getConfig();
})
