import { Module } from '@nestjs/common';

import { WebhookController } from './webhook.controller';

@Module({
  imports: [],
  controllers: [WebhookController],
})
export class WebhookModule { }
