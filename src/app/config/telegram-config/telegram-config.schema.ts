import { Logger } from '@nestjs/common';
import { IsNumber, IsOptional, isString, IsString, validateOrReject, ValidationError } from 'class-validator';

import { ConfigMessages } from '../config.constant';

export const TelegramConfigEnum = {
  TELEGRAM_BOT_AUTH_TOKEN: 'telegramBotAuthToken',
  TELEGRAM_BOT_NAME: 'telegramBotName',

  TELEGRAM_WEBHOOK_DOMAIN: 'telegramWebhookDomain',
  TELEGRAM_WEBHOOK_PATH: 'telegramWebhookPath',

  TELEGRAM_USERBOT_NAME: 'telegramUserbotName',
  TELEGRAM_USERBOT_API_ID: 'telegramUserbotApiId',
  TELEGRAM_USERBOT_API_HASH: 'telegramUserbotApiHash',
  TELEGRAM_USERBOT_SESSION_STRING: 'telegramUserbotSessionString',
} as const;

export interface TelegramConfigInterface {
  [TelegramConfigEnum.TELEGRAM_BOT_AUTH_TOKEN]: string;
  [TelegramConfigEnum.TELEGRAM_BOT_NAME]: string;
  [TelegramConfigEnum.TELEGRAM_WEBHOOK_DOMAIN]: string;
  [TelegramConfigEnum.TELEGRAM_WEBHOOK_PATH]: string;

  [TelegramConfigEnum.TELEGRAM_USERBOT_NAME]: string;
  [TelegramConfigEnum.TELEGRAM_USERBOT_API_ID]: number;
  [TelegramConfigEnum.TELEGRAM_USERBOT_API_HASH]: string;
  [TelegramConfigEnum.TELEGRAM_USERBOT_SESSION_STRING]?: string;
}

export class TelegramConfigSchema implements TelegramConfigInterface {
  private readonly loggerPrefix = '[Telegram Config] --->';
  private readonly logger: Logger = new Logger(TelegramConfigSchema.name);

  @IsString()
  telegramBotAuthToken: string;

  @IsString()
  telegramBotName: string;

  @IsString()
  telegramWebhookDomain: string;

  @IsString()
  telegramWebhookPath: string;

  @IsString()
  telegramUserbotName: string;

  @IsNumber()
  telegramUserbotApiId: number;

  @IsString()
  telegramUserbotApiHash: string;

  @IsOptional()
  @IsString()
  telegramUserbotSessionString?: string;

  async validate() {
    return await validateOrReject(this).catch((errors) => {
      this.logger.log(`${this.loggerPrefix} ${ConfigMessages.ERROR.VALIDATION}:`, errors);

      throw new ValidationError();
    });
  }
}
