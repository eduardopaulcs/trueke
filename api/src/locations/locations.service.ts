import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(_parentId?: string): Promise<unknown> {
    throw new Error('TODO');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findChildren(_id: string): Promise<unknown> {
    throw new Error('TODO');
  }
}
