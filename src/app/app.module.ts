import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './app.constant';
import { appConfig, jwtConfig, pgConfig, telegramConfig } from './config';
import { WinstonModule } from 'nest-winston';
import { getLoggerOption } from './config/logger-options';

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
    WinstonModule.forRootAsync(getLoggerOption()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
