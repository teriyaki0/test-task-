import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { NotFoundError, ValidationError } from '@/domain/errors';

export type Create = (data: {
  title: string;
  description: string;
  categoryId: string;
  statusId: string;
  authorId: string; 
}) => Promise<IFeedback | never>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => {
  return async ({ title, description, categoryId, statusId, authorId }) => {
    
    if (!title || !description || !categoryId || !statusId || !authorId) {
      throw new ValidationError({
        code: 'FEEDBACK_VALIDATION_FAILED',
        message: 'All fields are required.',
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

    const newFeedback = await adapter.feedbackRepository.create({
      data: {
        title,
        description,
        category: {
          connect: { id: categoryId },
        },
        status: {
          connect: { id: statusId },
        },
        author: { 
          connect: { id: authorId }
        },
      },
    });

    return newFeedback;
  };
};
