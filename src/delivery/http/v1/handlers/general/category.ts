import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'category'>;

export type getCategories = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildGetCategories = ({ category }: Params): getCategories => {
  return async (req, res) => {
    const categories = await category.list();

    return res.status(200).json(categories);
  };
};
