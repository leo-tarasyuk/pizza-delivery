import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
