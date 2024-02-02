import { Controller, Get, Inject } from '@nestjs/common';
import { ApiService } from './api.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api')
export class ApiController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly apiService: ApiService,
  ) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }

  @Get('users')
  async getUsers() {
    return this.authService.send({ cmd: 'get-users' }, {});
  }
}
