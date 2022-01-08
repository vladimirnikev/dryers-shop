import { ValidationPipe } from '@nestjs/common';
if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc'
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  dayjs.extend(utc)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  app.use(cookieParser())

  await app.listen(3000)
}
bootstrap();
