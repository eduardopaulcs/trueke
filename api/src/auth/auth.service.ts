import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { userPublicSelect } from '../common/selects/user.select';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface AuthResult {
  user: {
    id: string;
    name: string;
    email: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
  };
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResult> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        roles: ['visitor'],
      },
      select: userPublicSelect,
    });

    return { user, accessToken: this.signToken(user.id, user.email, user.roles) };
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const publicUser = await this.prisma.user.findUniqueOrThrow({
      where: { id: user.id },
      select: userPublicSelect,
    });

    return { user: publicUser, accessToken: this.signToken(user.id, user.email, user.roles) };
  }

  logout(): void {
    // Cookie clearing is handled by the controller via res.clearCookie()
  }

  private signToken(userId: string, email: string, roles: string[]): string {
    return this.jwt.sign({ sub: userId, email, roles });
  }
}
