import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { InvalidDataError, NotFoundError } from '@/domain/errors';

export type List = (params: {
  page: number;
  pageSize: number;
  filters?: {
    category?: string;
    status?: string;
  };
  sortBy?: 'votes' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}) => Promise<{ feedbacks: IFeedback[]; total: number } | never>;

export const buildList = ({ adapter }: UseCaseParams): List => {
  return async ({
    page,
    pageSize,
    filters,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  }) => {
    if (page < 1 || pageSize < 1) {
      throw new InvalidDataError({
        message: 'Page and pageSize must be greater than 0',
        code: 'INVALID_PAGINATION_PARAMS',
      });
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: Record<string, any> = {};
    if (filters?.category) {
      where.category = {
        name: filters.category,
      };
    }
    if (filters?.status) {
      where.status = filters.status;
    }

    const orderBy: Record<string, any> = {};
    if (sortBy === 'createdAt') {
      orderBy.created_at = sortOrder;
    } else if (sortBy === 'votes') {
      orderBy.upvotes = { _count: sortOrder };
    } else {
      orderBy[sortBy] = sortOrder;
    }

    const [feedbacks, total] = await Promise.all([
      adapter.feedbackRepository.list({ skip, take, where, orderBy }),
      adapter.feedbackRepository.count({ where }),
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
