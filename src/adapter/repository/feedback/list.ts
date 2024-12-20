import { AdapterParams } from '@/adapter/types';
import { Prisma } from '@prisma/client';
import { IFeedback } from '@/domain/entity/feedback';

type Params = Pick<AdapterParams, 'db'>;

export type List = (
  params: Prisma.FeedbackFindManyArgs
) => Promise<Array<IFeedback> | never>;

export const buildList = ({ db }: Params): List => {
  return async (getParams) => {
    const feedbacks = await db.client.feedback.findMany(getParams) as Array<IFeedback>;

    return feedbacks;
  };
};
