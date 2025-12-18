import { Controller, Inject, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { WEBHOOK_ROUTES } from './webhook.constant';
import { HttpStatusCode } from 'axios';
const { BASE, TELEGRAM } = WEBHOOK_ROUTES;

@Controller(BASE)
export class WebhookController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger
  ) { }
  @Post(TELEGRAM)
  public async telegramWebhook(
    @Req() request: Request
  ): Promise<number> {
    this.logger.info('[TELEGRAM WEBHOOK] Принят запрос от Telegram: ', request.body);

    return HttpStatusCode.Accepted;
  }
}
