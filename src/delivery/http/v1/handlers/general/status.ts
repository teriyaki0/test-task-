import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStatusesFromPrisma = async () => {
  const statuses = await prisma.status.findMany();
  return statuses; 
};
