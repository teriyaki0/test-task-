import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';
import { NotFoundError } from '@/domain/errors';

type Params = Pick<DeliveryParams, 'feedback'>;

export type DeleteFeedback = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildDeleteFeedback = ({ feedback }: Params): DeleteFeedback => {
  return async (req, res) => {
    const { id } = req.params;

    const existingFeedback = await feedback.get({
      id,
    });

    if (!existingFeedback) {
      throw new NotFoundError({
        message: 'Feedback not found',
        code: 'FEEDBACK_NOT_FOUND',
      });
    }

    await feedback.delete({
      id,
    });

    return res.status(200).json({
      message: 'Feedback deleted successfully',
    });
  };
};
