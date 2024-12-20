import { AdapterParams, UnknownTx } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type Exist = (statusId: string, tx?: UnknownTx) => Promise<boolean>;

export const buildExist = ({ db }: Params): Exist => {
  return async (statusId, tx) => {
    const count = await db.getContextClient(tx).status.count({
      where: {
        id: statusId,
      },
    });

    return count > 0;
  };
};
