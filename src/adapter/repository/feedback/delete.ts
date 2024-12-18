import { IFeedback } from '@/domain/entity/feedback';
import { AdapterParams, UnknownTx } from '@/adapter/types';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Delete = (data: Prisma.FeedbackDeleteArgs, tx?: UnknownTx) => Promise<IFeedback | never>;

export const buildDelete = ({ db }: Params): Delete => {
  return async (data, tx) => {
    return await db.getContextClient(tx).feedback.delete(data) as IFeedback;
  };
};
