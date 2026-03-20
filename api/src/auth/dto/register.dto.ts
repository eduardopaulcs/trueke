import { IsEmail, IsString } from 'class-validator';
import { IsStrongPassword } from '../../common/validators/password.validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
