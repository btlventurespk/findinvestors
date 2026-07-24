import { PrismaClient } from '@prisma/client';
import startups from '../data/startups.json';

const prisma = new PrismaClient();

async function main() {
  for (const s of startups) {
    await prisma.startup.upsert({
      where: { slug: s.slug },
      update: s as never,
      create: s as never,
    });
  }
  console.log(`Seeded ${startups.length} startups.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
