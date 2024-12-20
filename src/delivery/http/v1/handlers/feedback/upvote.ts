import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'upvote'>;

export type UpvoteFeedback = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildUpvoteFeedback = ({ upvote }: Params): UpvoteFeedback => {
  return async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    
    if (!id || !userId) {
      return res.status(400).json({
        code: 'UPVOTE_VALIDATION_FAILED',
        message: 'Feedback ID and User ID are required.',
      });
    }

    const updatedFeedback = await upvote.create({ feedbackId: id, userId: req.user?.id });

    return res.status(200).json(updatedFeedback);
  };
};
