import { UseCaseParams } from '@/domain/usecase/types';

import { buildGet, Get } from './get';
import { buildUpdate, Update } from './update';


export type UserUseCase = {
  get: Get;
  update: Update;
};

export const buildUserUseCase = (params: UseCaseParams): UserUseCase => {
  const get = buildGet(params);
  const update = buildUpdate(params);

  return {
    get,
    update,
  };
};
