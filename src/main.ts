import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { ConfigEnum, ConfigEnvironment, TelegramConfigEnum } from '@core/config';
import { ENV_NAME, GLOBAL_API_PREFIX } from '@core/app.constant';

import { RequestLoggerInterceptor } from '@core/interceptors';
import { TelegramBotService } from '@core/modules/telegram-bot/telegram-bot.service';
import { removeMultipleSlashes, removeStartingSlash, removeTrailingSlash } from '@core/utils/url';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  // Сервисы
  const configService = app.get(ConfigService);
  const telegramBotService = app.get(TelegramBotService);

  // Сервер
  const host = configService.get(`${ConfigEnvironment.APP}.${ConfigEnum.HOST}`);
  const port = configService.get(`${ConfigEnvironment.APP}.${ConfigEnum.PORT}`);
  const env = configService.get(ENV_NAME) || undefined;

  // Телеграм-бот
  const telegramWebhookDomain = configService.get(`${ConfigEnvironment.TELEGRAM}.${TelegramConfigEnum.TELEGRAM_WEBHOOK_DOMAIN}`);
  const telegramWebhookPath = configService.get(`${ConfigEnvironment.TELEGRAM}.${TelegramConfigEnum.TELEGRAM_WEBHOOK_PATH}`);

  const corsEnabledURLs = configService
    .get(`${ConfigEnvironment.APP}.${ConfigEnum.CORS_ACCESS_ENABLED_URLS}`)
    .split(', ');


  app.setGlobalPrefix(GLOBAL_API_PREFIX); // Устанавливаем глобальный префикс для API

  app.enableCors({
    credentials: true,
    origin: [corsEnabledURLs],
  }); // Подключаем работу с CORS

  // Подключаем валидацию DTO на основе class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // + трансформация типов данных на основе DTO,
      transformOptions: {
        exposeUnsetFields: false,
      },
    }),
  );

  // Логирование входящих запросов
  app.useGlobalInterceptors(new RequestLoggerInterceptor());

  // Инициализация Telegram Bot
  telegramBotService.init();

  const telegramBot = telegramBotService.getBot();
  const telegramWebhookDomainURL = `${removeTrailingSlash(telegramWebhookDomain)}/${GLOBAL_API_PREFIX}`;
  const telegramWebhookPathURL = `/${removeStartingSlash(telegramWebhookPath)}`;
  const telegramWebhookURL = removeMultipleSlashes(`${telegramWebhookDomainURL}${telegramWebhookPathURL}`);

  const telegramBotWebhook = await telegramBot?.createWebhook({
    domain: telegramWebhookDomainURL,
    path: telegramWebhookPathURL,
  });

  // Подключаем webhook middleware без указания пути, так как путь уже указан в createWebhook
  app.use(telegramBotWebhook);

  Logger.log(`🤖 Telegram webhook настроен на: ${telegramWebhookURL}`);
  Logger.log(`📝 Убедитесь, что в настройках Telegram Bot указан URL: ${telegramWebhookURL}`);

  // Запуск сервера
  await app.listen(port);

  Logger.log(`🚀 Приложение запущено по адресу: http://${host}:${port}/${GLOBAL_API_PREFIX}`);
  Logger.log(`🌐 Тип окружения: ${env}`);
}
bootstrap();
