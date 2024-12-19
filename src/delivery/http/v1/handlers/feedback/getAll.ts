import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';
import { NotFoundError } from '@/domain/errors';

type Params = Pick<DeliveryParams, 'feedback'>;

export type GetAllFeedbacks = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildGetAllFeedbacks = ({ feedback }: Params): GetAllFeedbacks => {
  return async (req, res) => {
    const feedbacks = await feedback.getAll();

    if (!feedbacks || feedbacks.length === 0) {
      throw new NotFoundError({
        message: 'No feedbacks found',
        code: 'NO_FEEDBACKS_FOUND',
      });
    }
    return res.status(200).json(feedbacks);
  };
};
