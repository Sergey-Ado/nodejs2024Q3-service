import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  accessSync,
  appendFileSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { join } from 'node:path';

const levels = ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'];
const maxLevel = +(process.env.MAX_LOG_LEVEL || 5);

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logIndex: number;
  private errorIndex: number;

  constructor() {
    super();
    this.initialIndex();
    levels.forEach((level, index) => {
      if (index <= maxLevel) {
        this[level] = (
          message: unknown,
          context?: unknown,
          ...rest: unknown[]
        ): void => {
          super[level](message, context, ...rest);
          this.writeLogToFile(index, message as string, context as string);
        };
      } else {
        this[level] = () => {
          return;
        };
      }
    });
  }

  writeLogToFile = (level: number, message: string, context: string) => {
    const messageToFile = `${this.getTimestamp()} ${levels[
      level
    ].toUpperCase()} [${context}] ${message}`;

    const prefix = level === 1 ? 'error' : 'log';

    try {
      accessSync(join(process.cwd(), 'logs'));
    } catch {
      this.initialIndex();
    }

    let fileName = join(
      process.cwd(),
      `logs/${prefix}${this[`${prefix}Index`]}.log`,
    );

    try {
      const stats = statSync(fileName);
      if (stats.size > (+process.env.MAX_LOG_SIZE || 1024)) {
        this[`${prefix}Index`]++;
        fileName = join(
          process.cwd(),
          `logs/${prefix}${this[`${prefix}Index`]}.log`,
        );
      }
    } catch {}

    appendFileSync(fileName, messageToFile + '\n');
  };

  initialIndex = () => {
    const dir = join(process.cwd(), 'logs');
    mkdirSync(dir, { recursive: true });
    const listObj = readdirSync(dir, { withFileTypes: true });
    const listFileName = listObj
      .filter((obj) => obj.isFile())
      .map((file) => file.name);

    ['log', 'error'].forEach((prefix) => {
      const regExp = new RegExp(`^${prefix}(\\d+).log$`);

      const numberLogFile = listFileName
        .filter((filename) => regExp.test(filename))
        .map((filename) => +filename.match(regExp)[1]);
      this[`${prefix}Index`] = numberLogFile.length
        ? Math.max(...numberLogFile)
        : 1;
    });
  };
}
