import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from '../src/api.controller';
import { ApiService } from '../src/api.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/shared/rmq/rmq.module';

describe('ApiController', () => {
  let apiController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.development.env',
        }),
        RmqModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
      ],
      controllers: [ApiController],
      providers: [ApiService],
    }).compile();

    apiController = app.get<ApiController>(ApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiController.getHello()).toBe('Hello World!');
    });
  });
});
