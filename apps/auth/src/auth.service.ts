import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getUser(): { user: string } {
    return { user: 'USER' };
  }
}
