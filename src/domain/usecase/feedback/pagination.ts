import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { InvalidDataError, NotFoundError } from '@/domain/errors';

export type ListPaginated = (params: { page: number; pageSize: number }) => Promise<{ feedbacks: IFeedback[]; total: number } | never>;

export const buildListPaginated = ({ adapter }: UseCaseParams): ListPaginated => {
  return async ({ page, pageSize }) => {
    if (page < 1 || pageSize < 1) {
      throw new InvalidDataError({
        message: 'Page and pageSize must be greater than 0',
        code: 'INVALID_PAGINATION_PARAMS',
      });
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [feedbacks, total] = await Promise.all([
      adapter.feedbackRepository.getPaginated({ skip, take }),
      adapter.feedbackRepository.count({}),
    ]);

    if (!feedbacks || feedbacks.length === 0) {
      throw new NotFoundError({
        message: 'No feedbacks found for the given parameters',
        code: 'FEEDBACKS_NOT_FOUND',
      });
    }

    return { feedbacks, total };
  };
};
