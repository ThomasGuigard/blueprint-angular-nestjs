
import * as dotenv from 'dotenv';
import { Client, Pool } from 'pg';
dotenv.config({ path: `${process.cwd()}/.env` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
