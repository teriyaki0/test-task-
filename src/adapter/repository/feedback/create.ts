import { AdapterParams, UnknownTx } from '@/adapter/types';
import { Prisma } from '@prisma/client';
import { IFeedback } from '@/domain/entity/feedback';

type Params = Pick<AdapterParams, 'db'>;

export type Create = (data: Prisma.FeedbackCreateArgs, tx?: UnknownTx) => Promise<IFeedback | never>;

export const buildCreate = ({ db }: Params): Create => {
  return async (data, tx) => {
    return await db.getContextClient(tx).feedback.create(data) as IFeedback;
  };
};
