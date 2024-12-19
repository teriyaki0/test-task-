import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'Функциональность' },
    { name: 'Баг' },
    { name: 'UI' },
    { name: 'Производительность' },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  const statuses = [
    { name: 'Идея' },
    { name: 'Решено' },
    { name: 'В процессе' },
  ];

  for (const status of statuses) {
    await prisma.status.create({
      data: status,
    });
  }

  console.log('Categories and statuses have been seeded');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
