import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

console.log(process.env.PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: true,
  }))


  await app.listen(process.env.PORT);
}
bootstrap();
