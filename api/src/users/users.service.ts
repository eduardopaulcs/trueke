import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findMe(_userId: string): Promise<unknown> {
    throw new Error('TODO');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateMe(_userId: string, _dto: UpdateProfileDto): Promise<unknown> {
    throw new Error('TODO');
  }
}
