import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>;

export type UpdateFeedback = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildUpdateFeedback = ({ feedback }: Params): UpdateFeedback => {
  return async (req, res) => {
    const { id } = req.params;
    const { title, description, categoryId, statusId } = req.body;

    const updatedFeedback = await feedback.update({
      id,
      title,
      description,
      categoryId,
      statusId,
      authorId: req.user?.id
    });

    return res.status(200).json(updatedFeedback);
  };
};
