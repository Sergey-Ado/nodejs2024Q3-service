import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import * as yaml from 'yamljs';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { LoggingService } from './logger/logger.service';
import { CatchEverythingFilter } from './filter/catch.everything.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const doc: OpenAPIObject = yaml.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, doc);

  const logger = new LoggingService();
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(logger);

  await app.listen(process.env.PORT || 4000);

  process.on('uncaughtException', (err) => {
    logger.error(`uncaughtException ${err}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(`unhandledRejection ${err}`);
  });
}
bootstrap();
