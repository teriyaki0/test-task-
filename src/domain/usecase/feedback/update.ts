import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { NotFoundError } from '@/domain/errors';

export type Update = (data: {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  status?: string;
}) => Promise<IFeedback | never>;

export const buildUpdate = ({ adapter }: UseCaseParams): Update => {
  return async ({ id, title, description, category, status }) => {
    const feedback = await adapter.feedbackRepository.get({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundError({
        code: 'FEEDBACK_NOT_FOUND',
      });
    }

    const updatedFeedback = await adapter.feedbackRepository.update({
      where: { id },
      data: {
        title: title || feedback.title,
        description: description || feedback.description,
        category: category || feedback.category,
        status: status || feedback.status,
      },
    });

    return updatedFeedback;
  };
};
