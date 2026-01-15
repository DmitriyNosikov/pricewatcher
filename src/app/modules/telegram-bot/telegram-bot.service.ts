import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
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
    const startPayload = ('payload' in ctx) ? ctx.payload : null;
    console.log('CONTEXT: ', ctx);
    console.log('START PAYLOAD: ', startPayload);
  }

  public init(params?: TelegramBotParamsType) {
    try {
      this.logger.info('Инициализация Телеграм-бота ...');

      this.telegramBot = new Telegraf(this.botAuthToken);

      if (!this.telegramBot || this.telegramBot === null) {
        throw new Error('Не удалось создать инстанс класса Telegraf');
      }

      // Назначаем обработчик для команды /start
      this.telegramBot.start(this.handleStartCommand.bind(this));

      // Enable graceful stop
      process.once("SIGINT", () => this.telegramBot?.stop("SIGINT"));
      process.once("SIGTERM", () => this.telegramBot?.stop("SIGTERM"));

      this.logger.info(`Телеграм-бот успешно инициализирован`);
    } catch (error) {
      throw new BadGatewayException(`Не удалось инициализировать Telegram-бота. Ошибка: ${error.message}`);
    }
  }

  private getTelegramId(ctx: Context) {
    const telegramId = ctx.from?.id
      ? Number(ctx.from.id)
      : null;

    return telegramId;
  }
}