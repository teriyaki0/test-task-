import { AdapterParams } from '@/adapter/types';
import { IFeedback } from '@/domain/entity/feedback';

type Params = Pick<AdapterParams, 'db'>;

export type GetPaginated = (params: { skip: number; take: number }) => Promise<Array<IFeedback> | never>;

export const buildGetPaginated = ({ db }: Params): GetPaginated => {
  return async ({ skip, take }) => {
    const feedbacks = await db.client.feedback.findMany({
      skip,
      take
    });

    return feedbacks as Array<IFeedback>;
  };
};
