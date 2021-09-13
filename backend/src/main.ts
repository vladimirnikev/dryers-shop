if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc'
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v4 as uuid } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dayjs.extend(utc)
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  //   }),
  // );
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
