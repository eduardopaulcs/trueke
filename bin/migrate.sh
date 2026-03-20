#!/bin/sh
if [ "$1" = "--reset" ]; then
  shift
  printf "WARNING: This will DESTROY all data. Continue? [y/N] "
  read -r confirm
  [ "$confirm" = "y" ] || [ "$confirm" = "Y" ] || exit 1
  docker compose down -v
  docker compose up -d
  docker compose exec api npx prisma migrate dev "$@"
else
  docker compose exec api npx prisma migrate dev "$@"
fi
