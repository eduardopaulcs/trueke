import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateMarketDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsString()
  locationId: string;

  @IsObject()
  schedule: Record<string, unknown>;
}
