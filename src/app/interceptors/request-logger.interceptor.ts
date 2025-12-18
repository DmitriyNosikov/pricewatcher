import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

type RequestLoggerInterceptorOptions = {
  showRequestURI: boolean
  showHeaders: boolean,
  showBody: boolean,
};

export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly options: RequestLoggerInterceptorOptions = {
      showRequestURI: true,
      showHeaders: false,
      showBody: true,
    }
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const logger = new Logger('[Request Guard] --->');
    const request = context.switchToHttp().getRequest();

    if (this.options.showRequestURI) {
      logger.log(`Request: ${request.method} ${request.url}`);
    }

    if (this.options.showHeaders) {
      logger.log(`Request headers:`);
      logger.log(request.rawHeaders);
    }

    if (this.options.showBody && request.body && Object.keys(request.body).length > 0) {
      logger.log('Request body:');
      logger.log(request.body);
    }

    return next.handle();
  }
}
