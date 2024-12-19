import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';
import { InvalidDataError, NotFoundError } from '@/domain/errors';

type Params = Pick<DeliveryParams, 'feedback'>;

export type UpdateFeedback = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildUpdateFeedback = ({ feedback }: Params): UpdateFeedback => {
  return async (req, res) => {
    const { id } = req.params;
    const { title, description, categoryId, statusId } = req.body;

    if (!title && !description && !categoryId && !statusId) {
      throw new InvalidDataError({
        message: 'At least one field must be provided to update',
        code: 'MISSING_FIELDS',
      });
    }

    const existingFeedback = await feedback.get({
      id,
    });

    if (!existingFeedback) {
      throw new NotFoundError({
        message: 'Feedback not found',
        code: 'FEEDBACK_NOT_FOUND',
      });
    }

    const updatedFeedback = await feedback.update({
      id,
      title,
      description,
      categoryId,
      statusId,
    });

    return res.status(200).json(updatedFeedback);
  };
};
