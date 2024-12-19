import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>;

export type CreateFeedback = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildCreateFeedback = ({ feedback }: Params): CreateFeedback => {
  return async (req, res) => {
    const { title, description, category, status } = req.body;

    const newFeedback = await feedback.create({
      title,
      description,
      category,
      status,
      author_id: req.user?.id,
    });

    return res.status(201).json(newFeedback);
  };
};
