import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

import { AppModule } from '../src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cashier API')
    .setDescription('School Cashier Management API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (!existsSync('./swagger')) {
    mkdirSync('./swagger');
  }

  writeFileSync('./swagger/api.json', JSON.stringify(document, null, 2));

  console.log('✅ OpenAPI generated: swagger/api.json');

  await app.close();
}

bootstrap();
