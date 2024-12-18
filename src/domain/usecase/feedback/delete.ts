import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { NotFoundError } from '@/domain/errors';

export type Delete = (data: {
  id: string;
}) => Promise<IFeedback | never>;

export const buildDelete = ({ adapter }: UseCaseParams): Delete => {
  return async ({ id }) => {
    const feedback = await adapter.feedbackRepository.get({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundError({
        code: 'FEEDBACK_NOT_FOUND',
      });
    }

    const deletedFeedback = await adapter.feedbackRepository.delete({
      where: { id },
    });

    return deletedFeedback;
  };
};
