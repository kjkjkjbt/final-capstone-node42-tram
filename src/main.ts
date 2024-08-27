import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import *  as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.static("."))
  // setup swagger
  const configSwagger = new DocumentBuilder()
  .setTitle("Airbnb")
  .addBearerAuth()
  .setDescription("Danh sách các API về AirBnB")
  .setVersion("1.0")
  .build()

  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("swagger", app, swagger)

  await app.listen(3000);
}
bootstrap();
