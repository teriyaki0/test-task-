import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';
import { InvalidDataError } from '@/domain/errors'; // Импортируем ошибку для неверных данных

type Params = Pick<DeliveryParams, 'feedback'>;

export type CreateFeedback = (req: AuthRequest, res: Response) => Promise<Response>;

export const buildCreateFeedback = ({ feedback }: Params): CreateFeedback => {
  return async (req, res) => {
    try {
      const { title, description, category, status } = req.body;

      if (!title || !description || !category || !status) {
        throw new InvalidDataError({
          message: 'Missing required fields',
          code: 'MISSING_FIELDS'
        });
      }

      const newFeedback = await feedback.create({
        title,
        description,
        category,
        status,
        author_id: req.user?.id
      });

      return res.status(201).json(newFeedback);
    } catch (error) {
      if (error instanceof InvalidDataError) {
        return res.status(400).json({
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
