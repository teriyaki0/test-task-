import { AdapterParams } from '@/adapter/types';
import { buildCount, Count } from './count';
import { buildDelete, Delete } from './delete';
import { buildUpdate, Update } from './update';
import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';
import { buildList, List } from './list';

type Params = Pick<AdapterParams, 'db'>;

export type FeedbackRepository = {
  count: Count;
  create: Create;
  delete: Delete;
  get: Get;
  update: Update;
  list: List;
};

export const buildFeedbackRepository = (params: Params): FeedbackRepository => {
  const count = buildCount(params);
  const create = buildCreate(params);
  const deleteFeedback = buildDelete(params);
  const get = buildGet(params);
  const list = buildList(params)
  const update = buildUpdate(params);

  return {
    count,
    create,
    delete: deleteFeedback,
    get,
    update,
    list
  };
};
