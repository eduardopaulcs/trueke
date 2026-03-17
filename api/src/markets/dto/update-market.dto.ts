export class UpdateMarketDto {
  name?: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  locationId?: string;
  schedule?: Record<string, unknown>;
  active?: boolean;
}
