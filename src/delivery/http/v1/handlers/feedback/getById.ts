import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>;

export type GetByIdFeedback = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildGetByIdFeedback = ({ feedback }: Params): GetByIdFeedback => {
  return async (req, res) => {
    const feedbackId = req.params.id;

    const feedbackData = await feedback.get({
      id: feedbackId,
    });


    return res.status(200).json(feedbackData);
  };
};
