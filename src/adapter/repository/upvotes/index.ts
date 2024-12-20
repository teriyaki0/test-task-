import { AdapterParams } from '@/adapter/types';
import { buildCreate, Create } from './create';
import { buildDelete, Delete } from './delete';
import { buildExist, Exist } from './exist';
import { buildCountById, CountById } from './countById';

type Params = Pick<AdapterParams, 'db'>;

export type UpvoteRepository = {
    create: Create;
    delete: Delete;
    exist: Exist;
    count: CountById;
};
export const buildUpvoteRepository = (params: Params): UpvoteRepository => {
  const create = buildCreate(params);
  const deleteUpvote = buildDelete(params);
  const exist = buildExist(params);
  const count = buildCountById(params);

  return {
    create,
    delete: deleteUpvote,
    exist,
    count,
  };
};
