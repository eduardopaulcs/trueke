import { Injectable } from '@nestjs/common';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';

@Injectable()
export class MarketsService {
  findAll(): Promise<unknown> {
    throw new Error('TODO');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_organizerId: string, _dto: CreateMarketDto): Promise<unknown> {
    throw new Error('TODO');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(_id: string): Promise<unknown> {
    throw new Error('TODO');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_id: string, _dto: UpdateMarketDto): Promise<unknown> {
    throw new Error('TODO');
  }
}
