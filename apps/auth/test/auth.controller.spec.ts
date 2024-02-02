import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth.controller';
import { AuthService } from '../src/auth.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/shared/rmq/rmq.module';
import { RmqService } from '@app/shared/rmq/rmq.service';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.development.env',
        }),
        RmqModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
      ],
      controllers: [AuthController],
      providers: [RmqService, AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return user', async () => {
      const mockUser = { user: 'USER' };
      const result = await authController.getUser(null);

      expect(result).toEqual(mockUser);
    });
  });
});
