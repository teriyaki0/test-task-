import { UseCaseParams } from '@/domain/usecase/types';
import { IFeedback } from '@/domain/entity/feedback';

export type List = (data: {
  take?: number;
  skip?: number;
  where?: any;
}) => Promise<IFeedback[] | never>;

export const buildList = ({ adapter }: UseCaseParams): List => {
  return async ({ take = 10, skip = 0, where = {} }) => {
    const feedbacks = await adapter.feedbackRepository.list({
      where,
      take,
      skip,
    });

    return feedbacks;
  };
};
