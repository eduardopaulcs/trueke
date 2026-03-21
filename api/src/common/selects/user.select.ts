import { Prisma } from '@prisma/client';

// All User fields except password and soft-delete timestamp — safe to embed in any response
export const userPublicSelect = {
  id: true,
  name: true,
  email: true,
  roles: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;
