import { AdapterParams } from '@/adapter/types';
import { IStatus } from '@/domain/entity/status';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type List = (
  params: Prisma.StatusFindManyArgs
) => Promise<Array<IStatus> | never>;

export const buildList = ({ db }: Params): List => {
  return async (getParams) => {
    const statuses = await db.client.status.findMany(getParams) as Array<IStatus>;

    return statuses;
  };
};
