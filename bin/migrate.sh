#!/bin/sh
docker compose exec api npx prisma migrate dev "$@"
