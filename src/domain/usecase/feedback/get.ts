import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';  
import { NotFoundError } from '@/domain/errors';

export type Get = (data: {
  id: string;
}) => Promise<IFeedback | never>;

export const buildGet = ({ adapter }: UseCaseParams): Get => {
  return async ({ id }) => {
    const feedback = await adapter.feedbackRepository.get({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        created_at: true,
        updated_at: true,
        author_id: true,
      },
    });

    if (!feedback) {
      throw new NotFoundError({
        code: 'FEEDBACK_NOT_FOUND',
      });
    }

    return feedback;
  };
};
