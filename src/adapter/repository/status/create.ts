import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IStatus } from '@/domain/entity/status';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Create = (data: Prisma.StatusCreateArgs, tx?: UnknownTx) => Promise<IStatus | never>;

export const buildCreate = ({ db }: Params): Create => {
  return async (data, tx) => {
    return await db.getContextClient(tx).status.create(data) as IStatus;
  };
};
