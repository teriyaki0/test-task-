import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { ValidationError } from '@/domain/errors';

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
