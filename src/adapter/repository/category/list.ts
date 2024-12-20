import { AdapterParams } from '@/adapter/types';
import { Prisma } from '@prisma/client';
import { ICategory } from '@/domain/entity/category';

type Params = Pick<AdapterParams, 'db'>;

export type List = (
  params: Prisma.CategoryFindManyArgs
) => Promise<Array<ICategory> | never>;

export const buildList = ({ db }: Params): List => {
  return async (getParams) => {
    const categories = await db.client.category.findMany(getParams) as Array<ICategory>;

    return categories;
  };
};
