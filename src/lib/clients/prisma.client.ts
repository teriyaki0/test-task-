import { PrismaClient } from '@prisma/client';

export const newClient = (config: {
  user: string;
  password: string;
  port: number;
  host: string;
  db: string;
}) => {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.db}?connection_limit=10`,
      },
    },
  })


  const getContextClient = (tx?: unknown)=>{
    if (tx instanceof PrismaClient) {
      return tx
    }
    return client
  }

  return {
    client,
    getContextClient
  }
}
