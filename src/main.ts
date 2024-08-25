import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // setup swagger
  const configSwagger = new DocumentBuilder()
  .setTitle("Airbnb")
  .setDescription("Danh sách các API về AirBnB")
  .setVersion("1.0")
  .build()

  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("swagger", app, swagger)

  await app.listen(3000);
}
bootstrap();
