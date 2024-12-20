import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { NotFoundError } from '@/domain/errors';

export type Upvote = (data: {
  feedbackId: string;
  userId: string;
}) => Promise<IFeedback | never>;

export const buildUpvote = ({ adapter }: UseCaseParams): Upvote => {
  return async ({ feedbackId, userId }) => {

    const feedback = await adapter.feedbackRepository.get({
      where: { id: feedbackId },
    });

    if (!feedback || !userId) {
      throw new NotFoundError({
        message: 'No feedbacks found for the given parameters',
        code: 'FEEDBACK_NOT_FOUND',
      });
    }

    const existingUpvote = await adapter.upvoteRepository.exist(userId, feedbackId);

    if (existingUpvote) {
      await adapter.upvoteRepository.delete(userId, feedbackId);

      const upvoteCount = await adapter.upvoteRepository.count(feedbackId);

      const updatedFeedback = await adapter.feedbackRepository.update({
        where: { id: feedbackId },
        data: {
          upvoteCount,
        },
      });

      return updatedFeedback;
    } else {
      await adapter.upvoteRepository.create(userId, feedbackId);

      const upvoteCount = await adapter.upvoteRepository.count(feedbackId);

      const updatedFeedback = await adapter.feedbackRepository.update({
        where: { id: feedbackId },
        data: {
          upvoteCount,
        },
      });

      return updatedFeedback;
    }
  };
};
