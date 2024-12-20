import { AdapterParams, UnknownTx } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type CountById = (feedbackId: string, tx?: UnknownTx) => Promise<number>;

export const buildCountById = ({ db }: Params): CountById => {
  return async (feedbackId, tx) => {
    if (!feedbackId) {
      throw new Error('Feedback ID is required');
    }

    return await db.getContextClient(tx).upvote.count({
      where: {
        feedback_id: feedbackId,
      },
    });
  };
};
