import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';
import { NotFoundError } from '@/domain/errors'; 

type Params = Pick<DeliveryParams, 'feedback'>;

export type GetFeedback = (req: AuthRequest, res: Response) => Promise<Response>;

export const buildGetFeedback = ({ feedback }: Params): GetFeedback => {
  return async (req, res) => {
    try {
      const feedbackId = req.params.id;

      const feedbackData = await feedback.get({
        id: feedbackId
      });

      if (!feedbackData) {
        throw new NotFoundError({
          message: 'Feedback not found',
          code: 'FEEDBACK_NOT_FOUND'
        });
      }

      return res.status(200).json(feedbackData);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({
          message: error.message,
          code: error.code
        });
      }

      return res.status(500).json({
        message: 'Internal server error',
        code: 'INTERNAL_ERROR'
      });
    }
  };
};
