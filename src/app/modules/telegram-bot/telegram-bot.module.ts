import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegramBotRepository } from './telegram-bot.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [TelegramBotService, TelegramBotRepository],
  exports: [TelegramBotService]
})
export class TelegramBotModule { }