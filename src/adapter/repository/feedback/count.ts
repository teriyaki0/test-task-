import { AdapterParams } from '@/adapter/types';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Count = (params: Prisma.FeedbackCountArgs) => Promise<number | never>;

export const buildCount = ({ db }: Params): Count => {
  return async (args) => {
    const feedbackCount = await db.client.feedback.count(args);
    return feedbackCount;
  };
};
