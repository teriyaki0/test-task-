import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';
import { InvalidDataError, NotFoundError } from '@/domain/errors'; 

type Params = Pick<DeliveryParams, 'feedback'>;

export type UpdateFeedback = (req: AuthRequest, res: Response) => Promise<Response>;

export const buildUpdateFeedback = ({ feedback }: Params): UpdateFeedback => {
  return async (req, res) => {
    try {
      const { id } = req.params; 
      const { title, description, category, status } = req.body;

      if (!title && !description && !category && !status) {
        throw new InvalidDataError({
          message: 'At least one field must be provided to update',
          code: 'MISSING_FIELDS'
        });
      }

      const existingFeedback = await feedback.get({
        id
      });

      if (!existingFeedback) {
        throw new NotFoundError({
          message: 'Feedback not found',
          code: 'FEEDBACK_NOT_FOUND'
        });
      }

      const updatedFeedback = await feedback.update({
        id,
        title,
        description,
        category,
        status
      });

      return res.status(200).json(updatedFeedback);
    } catch (error) {
      if (error instanceof InvalidDataError) {
        return res.status(400).json({
          message: error.message,
          code: error.code
        });
      }

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
