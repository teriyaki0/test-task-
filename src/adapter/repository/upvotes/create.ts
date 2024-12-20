import { AdapterParams, UnknownTx } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type Create = (
  userId: string,
  feedbackId: string,
  tx?: UnknownTx
) => Promise<void>;

export const buildCreate = ({ db }: Params): Create => {
  return async (userId, feedbackId, tx) => {
    await db.getContextClient(tx).upvote.create({
      data: {
        feedback: {
          connect: { id: feedbackId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  };
};
