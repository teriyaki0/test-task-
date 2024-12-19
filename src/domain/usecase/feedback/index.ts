import { UseCaseParams } from '@/domain/usecase/types';
import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';
import { buildUpdate, Update } from './update';
import { buildDelete, Delete } from './delete';
import { buildListAll, ListAll } from './getAll';
import { buildListPaginated, ListPaginated } from './pagination';


export type FeedbackUseCase = {
  create: Create;
  get: Get;
  pagination: ListPaginated;
  update: Update;
  delete: Delete;
  getAll: ListAll;
};

export const buildFeedbackUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const create = buildCreate(params);
  const get = buildGet(params);
  const pagination = buildListPaginated(params);
  const getAll = buildListAll(params);
  const update = buildUpdate(params);
  const deleteFeedback = buildDelete(params);

  return {
    create,
    pagination,
    get,
    getAll,
    update,
    delete: deleteFeedback,
  };
};
