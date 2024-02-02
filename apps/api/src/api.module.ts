import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { RmqModule } from '@app/shared/rmq/rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    RmqModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
