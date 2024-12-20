import { UseCaseParams } from '@/domain/usecase/types';
import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';
import { buildUpdate, Update } from './update';
import { buildDelete, Delete } from './delete';
import { buildList, List } from './list';


export type FeedbackUseCase = {
  create: Create;
  get: Get;
  list: List;
  update: Update;
  delete: Delete;
};

export const buildFeedbackUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const create = buildCreate(params);
  const get = buildGet(params);
  const list = buildList(params);
  const update = buildUpdate(params);
  const deleteFeedback = buildDelete(params);

  return {
    create,
    list,
    get,
    update,
    delete: deleteFeedback,
  };
};
