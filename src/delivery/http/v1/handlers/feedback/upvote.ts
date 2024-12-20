import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import { ValidationError } from '@/domain/errors';
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
    console.log(userId)

    if (!id || !userId) {
      return res.status(400).json({
        code: 'UPVOTE_VALIDATION_FAILED',
        message: 'Feedback ID and User ID are required.',
      });
    }

    try {
      const updatedFeedback = await upvote.create({ feedbackId: id, userId: req.user?.id });

      return res.status(200).json(updatedFeedback);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          code: error.code,
          message: error.message,
        });
      }
      return res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong.',
      });
    }
  };
};
