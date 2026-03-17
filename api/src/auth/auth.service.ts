import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(_dto: RegisterDto): Promise<unknown> {
    throw new Error('TODO');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(_dto: LoginDto): Promise<unknown> {
    throw new Error('TODO');
  }
}
