import { ConfigType, registerAs } from '@nestjs/config';
import { TelegramConfigInterface, TelegramConfigSchema } from './telegram-config.schema';
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '../config.constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<TelegramConfigInterface> {
  const telegramBotName = (process.env.TELEGRAM_USERBOT_NAME?.startsWith('@'))
    ? process.env.TELEGRAM_USERBOT_NAME.slice(1)
    : process.env.TELEGRAM_USERBOT_NAME;

  const config = plainToClass(TelegramConfigSchema, {
    telegramBotAuthToken: process.env.TELEGRAM_BOT_AUTH_TOKEN,
    telegramBotName: process.env.TELEGRAM_BOT_NAME,

    telegramWebhookDomain: process.env.TELEGRAM_WEBHOOK_DOMAIN,
    telegramWebhookPath: process.env.TELEGRAM_WEBHOOK_PATH,

    telegramUserbotName: telegramBotName,
    telegramUserbotApiId: parseInt(
      process.env.TELEGRAM_USERBOT_API_ID as string,
      10
    ),
    telegramUserbotApiHash: process.env.TELEGRAM_USERBOT_API_HASH,
    telegramUserbotSessionString: process.env.TELEGRAM_USERBOT_SESSION_STRING,
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.TELEGRAM, async (): PromisifiedConfig => {
  return getConfig();
});
