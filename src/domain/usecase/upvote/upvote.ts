import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { ValidationError } from '@/domain/errors';

export type Upvote = (data: {
  feedbackId: string;
  userId: string;
}) => Promise<IFeedback | never>;

export const buildUpvote = ({ adapter }: UseCaseParams): Upvote => {
  return async ({ feedbackId, userId }) => {
    if (!feedbackId || !userId) {
      throw new ValidationError({
        code: 'UPVOTE_VALIDATION_FAILED',
        message: 'Feedback ID and User ID are required.',
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
