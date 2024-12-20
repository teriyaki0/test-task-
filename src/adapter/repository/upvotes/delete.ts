import { AdapterParams, UnknownTx } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type Delete = (userId: string, feedbackId: string, tx?: UnknownTx) => Promise<void>;

export const buildDelete = ({ db }: Params): Delete => {
  return async (userId, feedbackId, tx) => {
    await db.getContextClient(tx).upvote.deleteMany({
      where: {
        user_id: userId,
        feedback_id: feedbackId,
      },
    });
  };
};
