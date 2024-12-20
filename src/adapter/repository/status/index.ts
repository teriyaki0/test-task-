import { AdapterParams } from '@/adapter/types';
import { buildCreate, Create } from './create';
import { buildDelete, Delete } from './delete';
import { buildExist, Exist } from './exist';
import { buildList, List } from './list';

type Params = Pick<AdapterParams, 'db'>;

export type StatusRepository = {
    create: Create;
    delete: Delete;
    exist: Exist;
    list: List;
};

export const buildStatusRepository = (params: Params): StatusRepository => {
  const create = buildCreate(params);
  const list = buildList(params);
  const deleteStatus = buildDelete(params);
  const exist = buildExist(params);


  return {
    create,
    delete: deleteStatus,
    exist,
    list
  };
};
