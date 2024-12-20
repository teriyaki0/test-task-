import { UseCaseParams } from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { ICategory } from '@/domain/entity/category';

export type List = () => Promise<ICategory[] | never>; 

export const buildList = ({ adapter }: UseCaseParams): List => {
  return async () => {
    const categories = await adapter.categoryRepository.list({});

    if (categories.length === 0) {
      throw new NotFoundError({
        message: 'No categories found for the given parameters',
        code: 'CATEGORY_NOT_FOUND',
      });
    }

    return categories;
  };
};
