import { AdapterParams } from '@/adapter/types';
import { buildCreate, Create } from './create';
import { buildDelete, Delete } from './delete';
import { buildExist, Exist } from './exist';
import { buildList, List } from './list';

type Params = Pick<AdapterParams, 'db'>;

export type CategoryRepository = {
    create: Create;
    delete: Delete;
    exist: Exist;
    list: List;
};

export const buildCategoryRepository = (params: Params): CategoryRepository => {
  const create = buildCreate(params);
  const list = buildList(params);
  const deleteCategory = buildDelete(params);
  const exist = buildExist(params);


  return {
    create,
    delete: deleteCategory,
    exist,
    list

  };
};
