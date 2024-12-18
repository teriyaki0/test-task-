import { UseCaseParams } from '@/domain/usecase/types';
import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';
// import { buildList, List } from './pagination';
import { buildUpdate, Update } from './update';
import { buildDelete, Delete } from './delete';
import { buildListAll, ListAll } from './getAll';


export type FeedbackUseCase = {
  create: Create;
  get: Get;
  // list: List;
  update: Update;
  delete: Delete;
  getAll: ListAll;
};

export const buildFeedbackUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const create = buildCreate(params);
  const get = buildGet(params);
  // const list = buildList(params);
  const getAll = buildListAll(params);

  const update = buildUpdate(params);
  const deleteFeedback = buildDelete(params);

  return {
    create,
    get,
    // list,
    getAll,
    update,
    delete: deleteFeedback,
  };
};
