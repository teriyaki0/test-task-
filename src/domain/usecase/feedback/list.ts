import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { InvalidDataError, NotFoundError } from '@/domain/errors';

export type List = (params: {
  page: number;
  pageSize: number;
  filters?: { category?: string; status?: string };
  sortBy?: 'votes' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}) => Promise<{ feedbacks: IFeedback[]; total: number }>;

export const buildList = ({ adapter }: UseCaseParams): List => async ({
  page,
  pageSize,
  filters = {},
  sortBy = 'createdAt',
  sortOrder = 'desc',
}) => {
  if (page < 1 || pageSize < 1) {
    throw new InvalidDataError({message: 'Page and pageSize must be greater than 0', code: 'INVALID_PAGINATION_PARAMS'});
  }

  const where = {
    ...(filters.category && { category: { name: filters.category } }),
    ...(filters.status && { status: { name: filters.status } }),
  };

  const orderBy = sortBy === 'votes' ? { upvotes: { _count: sortOrder } } : { created_at: sortOrder };
  const [feedbacks, total] = await Promise.all([
    adapter.feedbackRepository.list({ skip: (page - 1) * pageSize, take: pageSize, where, orderBy }),
    adapter.feedbackRepository.count({ where }),
  ]);

  if (!feedbacks.length) {
    throw new NotFoundError({message: 'No feedbacks found for the given parameters', code: 'FEEDBACKS_NOT_FOUND'});
  }

  return { feedbacks, total };
};
