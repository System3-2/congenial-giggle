import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Jobster API')
    .setDescription('Jobster api documentation')
    .setVersion('1.0')
    .addTag('Jobster')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`Server is listening on PORT ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
