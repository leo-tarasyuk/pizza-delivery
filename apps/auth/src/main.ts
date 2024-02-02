import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { RmqService } from '@app/shared/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const rmqService = app.get(RmqService);
  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice(rmqService.getRmqOptions(queue));
  await app.startAllMicroservices();
}
bootstrap();
