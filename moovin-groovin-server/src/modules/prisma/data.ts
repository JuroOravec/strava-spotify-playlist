import type { PrismaClient } from '@prisma/client';
import type { PrismaClientOptions } from '@prisma/client/runtime';

interface PrismaExternalData {
  clientOptions: Omit<PrismaClientOptions, '__internal'>;
}

interface PrismaInternalData {
  client: PrismaClient | null;
}

type PrismaData = PrismaExternalData & PrismaInternalData;

export { PrismaData, PrismaExternalData };
