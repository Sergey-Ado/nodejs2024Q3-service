import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // constructor(private logger: LoggingService) {}
  private logger = new Logger(LoggingService.name);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const message = `METHOD: ${req.method} | URL: ${
        req.url
      } | PARAMS: ${JSON.stringify(req.params)} | BODY: ${JSON.stringify(
        req.body,
      )} | STATUSCODE: ${res.statusCode}`;

      // if (res.statusCode < 400) this.logger.log(message, 'NestApplication');
      // else this.logger.error(message, 'NestApplication');
      if (res.statusCode < 400) this.logger.log(message);
      else this.logger.error(message);
    });
    next();
  }
}
