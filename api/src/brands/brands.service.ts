import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_ownerId: string, _dto: CreateBrandDto): Promise<unknown> {
    throw new Error('TODO');
  }

  findAll(): Promise<unknown> {
    throw new Error('TODO');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(_id: string): Promise<unknown> {
    throw new Error('TODO');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_id: string, _dto: UpdateBrandDto): Promise<unknown> {
    throw new Error('TODO');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(_id: string): Promise<unknown> {
    throw new Error('TODO');
  }
}
