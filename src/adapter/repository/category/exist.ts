import { AdapterParams, UnknownTx } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type Exist = (categoryId: string, tx?: UnknownTx) => Promise<boolean>;

export const buildExist = ({ db }: Params): Exist => {
  return async (categoryId, tx) => {
    const count = await db.getContextClient(tx).category.count({
      where: {
        id: categoryId,
      },
    });

    return count > 0;
  };
};
