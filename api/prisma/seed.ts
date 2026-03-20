import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL as string }),
});

// ─── Types ───────────────────────────────────────────────────────────────────

type LocationsFile = {
  [level: `level_${number}`]: string[] | Record<string, string>;
};

// ─── Seeders ─────────────────────────────────────────────────────────────────

async function seedLocations() {
  const file: LocationsFile = JSON.parse(
    readFileSync(join(__dirname, 'data/locations.json'), 'utf-8'),
  );

  const idByName: Record<string, string> = {};
  let total = 0;

  const levelKeys = Object.keys(file)
    .filter((k) => /^level_\d+$/.test(k))
    .sort((a, b) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]));

  for (const levelKey of levelKeys) {
    const level = parseInt(levelKey.split('_')[1]);
    const entries = file[levelKey as `level_${number}`];

    if (Array.isArray(entries)) {
      for (const name of entries) {
        const record = await prisma.location.create({ data: { name, level } });
        idByName[name] = record.id;
        total++;
      }
    } else {
      for (const [name, parentName] of Object.entries(entries)) {
        const parentId = idByName[parentName] ?? null;
        const record = await prisma.location.create({ data: { name, level, parentId } });
        idByName[name] = record.id;
        total++;
      }
    }
  }

  console.log(`Locations done: ${total} records.`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  await seedLocations();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
