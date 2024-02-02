import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RmqService } from '@app/shared/rmq/rmq.service';

@Controller('users')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    if (context) this.rmqService.acknowledgeMessage(context);

    return this.authService.getUser();
  }
}
