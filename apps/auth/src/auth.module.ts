import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RmqModule } from '@app/shared/rmq/rmq.module';
import { RmqService } from '@app/shared/rmq/rmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    RmqModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, RmqService],
})
export class AuthModule {}
