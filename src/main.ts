import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { ConfigEnum, ConfigEnvironment } from '@core/config';
import { ENV_NAME, GLOBAL_API_PREFIX } from '@core/app.constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RequestLoggerInterceptor } from '@core/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  const configService = app.get(ConfigService);

  const host = configService.get(`${ConfigEnvironment.APP}.${ConfigEnum.HOST}`);
  const port = configService.get(`${ConfigEnvironment.APP}.${ConfigEnum.PORT}`);
  const env = configService.get(ENV_NAME) || undefined;

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

  // Запуск сервера
  await app.listen(port);

  Logger.log(`🚀 Приложение запущено по адресу: http://${host}:${port}/${GLOBAL_API_PREFIX}`);
  Logger.log(`🌐 Тип окружения: ${env}`);
}
bootstrap();
