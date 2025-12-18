import { Inject, Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

import { TelegramBotRepository } from './telegram-bot.repository';
import { TelegramBotParamsType } from './types/telegram-bot-init-data.type';
import { ConfigEnvironment, TelegramConfigEnum } from '@core/config';

@Injectable()
export class TelegramBotService {
  private telegramBot: Telegraf | null = null;
  private botAuthToken: string = '';

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly telegramBotRepository: TelegramBotRepository
  ) {
    this.botAuthToken = configService.get<string>(
      `${ConfigEnvironment.TELEGRAM}.${TelegramConfigEnum.TELEGRAM_BOT_AUTH_TOKEN}`
    ) as string;
  }

  public getBot() {
    return this.telegramBot;
  }

  private async handleStartCommand(ctx: Context) {
    const loggerPrefix = '[START COMMAND]';

    this.logger.configure({
      defaultMeta: loggerPrefix
    });

    this.logger.info(`Получена команда /start`);

    const telegramInitiatorId = this.getTelegramId(ctx);

    console.log('CONTEXT: ', ctx);
  }

  public init(params?: TelegramBotParamsType) {
    this.logger.info('Инициализация Телеграм-бота ...');

    this.telegramBot = new Telegraf(this.botAuthToken);

    if (!this.telegramBot || this.telegramBot === null) {
      throw new Error('Не удалось создать инстанс класса Telegraf');
    }

    // Назначаем обработчик для команды /start
    this.telegramBot.start(async (ctx) => {
      console.log(ctx);
    });

    // Enable graceful stop
    process.once("SIGINT", () => this.telegramBot?.stop("SIGINT"));
    process.once("SIGTERM", () => this.telegramBot?.stop("SIGTERM"));

    this.logger.info(`Телеграм-бот успешно инициализирован`);
  }

  private getTelegramId(ctx: Context) {
    const telegramId = ctx.from?.id
      ? Number(ctx.from.id)
      : null;

    return telegramId;
  }
}