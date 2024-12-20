import { UseCaseParams } from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { IStatus } from '@/domain/entity/status';

export type List = () => Promise<IStatus[] | never>; 

export const buildList = ({ adapter }: UseCaseParams): List => {
  return async () => {
    const statuses = await adapter.statusRepository.list({});

    if (statuses.length === 0) {
      throw new NotFoundError({
        message: 'No statuses found for the given parameters',
        code: 'STATUS_NOT_FOUND',
      });
    }

    return statuses;
  };
};
