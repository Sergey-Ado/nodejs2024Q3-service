import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const message = `METHOD: ${req.method} | URL: ${
        req.url
      } | PARAMS: ${JSON.stringify(req.params)} | BODY: ${JSON.stringify(
        req.body,
      )} | STATUSCODE: ${res.statusCode}`;

      if (res.statusCode < 400) this.logger.log(message, 'LoggingService');
      else this.logger.error(message, 'LoggingService');
    });
    next();
  }
}
