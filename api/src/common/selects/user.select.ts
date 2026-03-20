import { Prisma } from '@prisma/client';

// All User fields except password — safe to embed in any response
export const userPublicSelect = {
  id: true,
  name: true,
  email: true,
  roles: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
} satisfies Prisma.UserSelect;
