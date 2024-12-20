import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { NotFoundError, ForbiddenError } from '@/domain/errors';

export type Update = (data: {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  statusId: string;
  authorId: string;  
}) => Promise<IFeedback | never>;

export const buildUpdate = ({ adapter }: UseCaseParams): Update => {
  return async ({ id, title, description, categoryId, statusId, authorId }) => {
    const feedback = await adapter.feedbackRepository.get({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundError({
        message: 'No feedback found for the given parameters',
        code: 'FEEDBACK_NOT_FOUND',
      });
    }

    if (feedback.author_id !== authorId) {
      throw new ForbiddenError({
        code: 'FORBIDDEN',
        message: 'You are not authorized to update this feedback.',
      });
    }

    const categoryExists = await adapter.categoryRepository.exist(categoryId);
    if (!categoryExists) {
      throw new NotFoundError({
        code: 'CATEGORY_NOT_FOUND',
        message: `Category with ID ${categoryId} not found.`,
      });
    }

    const statusExists = await adapter.statusRepository.exist(statusId);
    if (!statusExists) {
      throw new NotFoundError({
        code: 'STATUS_NOT_FOUND',
        message: `Status with ID ${statusId} not found.`,
      });
    }

    const updatedFeedback = await adapter.feedbackRepository.update({
      where: { id },
      data: {
        title: title || feedback.title,
        description: description || feedback.description,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        status: statusId ? { connect: { id: statusId } } : undefined,
      },
    });

    return updatedFeedback;
  };
};
