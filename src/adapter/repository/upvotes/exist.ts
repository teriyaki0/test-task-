import { AdapterParams, UnknownTx } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type Exist = (userId: string, feedbackId: string, tx?: UnknownTx) => Promise<boolean>;

export const buildExist = ({ db }: Params): Exist => {
  return async (userId, feedbackId, tx) => {
    const count = await db.getContextClient(tx).upvote.count({
      where: {
        user_id: userId,
        feedback_id: feedbackId,
      },
    });

    return count > 0;
  };
};
