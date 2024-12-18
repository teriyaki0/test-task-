import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';
import { ValidationError } from '@/domain/errors';

export type Create = (data: {
  title: string;
  description: string;
  category: string;
  status: string;
  author_id: string;
}) => Promise<IFeedback | never>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => {
  return async ({ title, description, category, status, author_id }) => {
    if (!title || !description || !category || !status || !author_id) {
      throw new ValidationError({
        code: 'FEEDBACK_VALIDATION_FAILED',
        message: 'All fields are required.',
      });
    }

    const newFeedback = await adapter.feedbackRepository.create({
      data: {
        title,
        description,
        category,
        status,
        author_id,
      },
    });

    return newFeedback;
  };
};
