import { AdapterParams } from '@/adapter/types';
import { buildCount, Count } from './count';
import { buildDelete, Delete } from './delete';
import { buildUpdate, Update } from './update';
import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';
import { buildGetAll, GetAll } from './getAll';
import { buildGetPaginated, GetPaginated } from './getPaginated';

type Params = Pick<AdapterParams, 'db'>;

export type FeedbackRepository = {
  count: Count;
  create: Create;
  delete: Delete;
  get: Get;
  getAll: GetAll;
  update: Update;
  getPaginated: GetPaginated;
};

export const buildFeedbackRepository = (params: Params): FeedbackRepository => {
  const count = buildCount(params);
  const create = buildCreate(params);
  const deleteFeedback = buildDelete(params);
  const get = buildGet(params);
  const getAll = buildGetAll(params);
  const getPaginated = buildGetPaginated(params)
  const update = buildUpdate(params);

  return {
    count,
    create,
    delete: deleteFeedback,
    get,
    update,
    getAll,
    getPaginated
  };
};
