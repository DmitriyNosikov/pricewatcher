import { Injectable } from '@nestjs/common';
import { TelegramBotRepository } from './telegram-bot.repository';

@Injectable()
export class TelegramBotService {
  constructor(
    private readonly telegramBotRepository: TelegramBotRepository
  ) { }
}