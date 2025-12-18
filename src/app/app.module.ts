import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WinstonModule } from 'nest-winston';

import { ENV_FILE_PATH } from './app.constant';
import { appConfig, ConfigEnvironment, jwtConfig, pgConfig, telegramConfig } from './config';
import { getLoggerOption } from './config/logger-options';
import { getDbOPtions } from './config/db-options';

import { TelegramBotModule } from './modules/telegram-bot/telegram-bot.module';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [
    // Конфигурация приложения
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      load: [
        appConfig,
        pgConfig,
        jwtConfig,
        telegramConfig,
      ],
    }),

    // Конфигурация кастомного логгера (winston)
    WinstonModule.forRootAsync(
      getLoggerOption()
    ),

    // Конфигурация подключения к БД
    SequelizeModule.forRootAsync(
      getDbOPtions(ConfigEnvironment.PG)
    ),

    // Модуля
    WebhookModule,
    TelegramBotModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
