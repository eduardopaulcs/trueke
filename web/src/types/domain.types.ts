// Roles are additive: a vendor also has visitor, an organizer has both.
export type UserRole = 'visitor' | 'vendor' | 'organizer';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string | null;
  categories: string[];
  ownerId: string;
  owner: User;
  isFollowing: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  parentId: string | null;
}

// Opaque until the schedule format is formalized in the API.
export type MarketSchedule = Record<string, unknown>;

export interface Market {
  id: string;
  name: string;
  description: string | null;
  address: string;
  latitude: number | null;
  longitude: number | null;
  locationId: string;
  location: Location;
  active: boolean;
  verified: boolean;
  schedule: MarketSchedule;
  organizerId: string | null;
  organizer: User | null;
  createdAt: string;
}

export interface Attendance {
  id: string;
  brandId: string;
  marketId: string;
  // Full UTC ISO string — use lib/date.ts helpers for formatting/normalization.
  date: string;
  confirmed: boolean;
  brand: Brand;
  market?: Market;
  createdAt: string;
}

export interface Follow {
  id?: string;
  followerId: string;
  brandId: string;
  createdAt?: string;
}

// Input types (request payloads)

export interface CreateBrandInput {
  name: string;
  description?: string;
  categories?: string[];
}

export interface UpdateBrandInput {
  name?: string;
  description?: string;
  categories?: string[];
}

export interface CreateMarketInput {
  name: string;
  description?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  locationId: string;
  schedule: MarketSchedule;
}

export interface UpdateMarketInput {
  name?: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  locationId?: string;
  schedule?: MarketSchedule;
  active?: boolean;
}

// Cancellation is done by upserting with confirmed: false — there is no DELETE endpoint.
export interface UpsertAttendanceInput {
  date: string; // YYYY-MM-DD
  confirmed: boolean;
}
