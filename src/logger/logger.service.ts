import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
    this['log'] = (
      message: unknown,
      context?: unknown,
      ...rest: unknown[]
    ): void => {
      super.log(message, context, ...rest);
    };
  }
}
