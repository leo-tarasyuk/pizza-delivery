import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiModule } from '../src/api.module';
import { RmqModule } from '@app/shared/rmq/rmq.module';

describe('ApiController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RmqModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
        ApiModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    request(app.getHttpServer()).get('/').expect(404);
  });

  it('/api (GET)', () => {
    request(app.getHttpServer()).get('/api').expect(200).expect('Hello World!');
  });

  it('/api/users (GET)', () => {
    request(app.getHttpServer())
      .get('/api/users')
      .expect(200)
      .expect({ user: 'USER' });
  });

  afterAll(async () => {
    await app.close();
  });
});
