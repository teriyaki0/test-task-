import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';
import { ValidationError } from '@/domain/errors';

type Params = Pick<DeliveryParams, 'feedback'>;

export type CreateFeedback = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildCreateFeedback = ({ feedback }: Params): CreateFeedback => {
  return async (req, res) => {
    const { title, description, categoryId, statusId } = req.body;

    if (!title || !description || !categoryId || !statusId) {
      throw new ValidationError({
        code: 'FEEDBACK_VALIDATION_FAILED',
        message:
          'All fields (title, description, categoryId, statusId) are required.',
      });
    }

    const newFeedback = await feedback.create({
      title,
      description,
      categoryId: categoryId,
      statusId: statusId,
      authorId: req.user?.id,
    });

    return res.status(201).json(newFeedback);
  };
};
