import { ConsoleLogger, Injectable } from '@nestjs/common';

const levels = ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'];
const maxLevel = +(process.env.MAX_LOG_LEVEL || 5);

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
    levels.forEach((level, index) => {
      if (index <= maxLevel) {
        this[level] = (
          message: unknown,
          context?: unknown,
          ...rest: unknown[]
        ): void => {
          super[level](message, context, ...rest);
        };
      } else {
        this[level] = () => {};
      }
    });
  }
}
