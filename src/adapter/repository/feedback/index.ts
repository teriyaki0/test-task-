import { AdapterParams } from '@/adapter/types';
import { buildCount, Count } from './count';
import { buildDelete, Delete } from './delete';
import { buildUpdate, Update } from './update';
import { List, buildList } from './list';
import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';
import { buildGetAll, GetAll } from './getAll';

type Params = Pick<AdapterParams, 'db'>;

export type FeedbackRepository = {
  count: Count;
  create: Create;
  delete: Delete;
  get: Get;
  list: List;
  getAll: GetAll;
  update: Update;
};

export const buildFeedbackRepository = (params: Params): FeedbackRepository => {
  const count = buildCount(params);
  const create = buildCreate(params);
  const deleteFeedback = buildDelete(params);
  const get = buildGet(params);
  const list = buildList(params);
  const getAll = buildGetAll(params);

  const update = buildUpdate(params);

  return {
    count,
    create,
    delete: deleteFeedback,
    get,
    list,
    update,
    getAll,
  };
};
