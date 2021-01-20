
import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.cwd(), "a")
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
