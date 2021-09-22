import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as helmet from 'helmet';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: process.env.CORS_ORIGIN || '*' });

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Dribble API')
    .setDescription(
      'Documentação do backend do Dribble, utilizado no Formação Frontend Expert',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'Daniel Berg',
      'https://maratonas.academy/',
      'daniel@maratonas.academy',
    )
    .setExternalDoc(
      'GitHub do backend',
      'https://github.com/daniel-bergholz/dribble-backend',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
