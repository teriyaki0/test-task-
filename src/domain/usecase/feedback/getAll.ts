import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { NotFoundError } from '@/domain/errors';

export type ListAll = () => Promise<IFeedback[] | never>;

export const buildListAll = ({ adapter }: UseCaseParams): ListAll => {
  return async () => {
    const feedbacks = await adapter.feedbackRepository.getAll();

    if (!feedbacks || feedbacks.length === 0) {
      throw new NotFoundError({
        code: 'FEEDBACKS_NOT_FOUND',
      });
    }

    return feedbacks;
  };
};
