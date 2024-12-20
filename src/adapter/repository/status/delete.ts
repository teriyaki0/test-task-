import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IStatus } from '@/domain/entity/status';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Delete = (data: Prisma.StatusDeleteArgs, tx?: UnknownTx) => Promise<IStatus | never>;

export const buildDelete = ({ db }: Params): Delete => {
  return async (data, tx) => {
    return await db.getContextClient(tx).status.delete(data) as IStatus;
  };
};
