import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedback'>;

export type Get = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildGet = ({ feedback }: Params): Get => {
  return async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const filters = {
      category: req.query.category as string | undefined,
      status: req.query.status as string | undefined,
    };

    const allowedSortBy: Array<'createdAt' | 'votes'> = ['createdAt', 'votes'];
    const sortBy = allowedSortBy.includes(req.query.sortBy as any)
      ? (req.query.sortBy as 'createdAt' | 'votes')
      : 'createdAt'; 

    const allowedSortOrder: Array<'asc' | 'desc'> = ['asc', 'desc'];
    const sortOrder = allowedSortOrder.includes(req.query.sortOrder as any)
      ? (req.query.sortOrder as 'asc' | 'desc')
      : 'desc'; 

    const data = await feedback.list({
      page,
      pageSize,
      filters,
      sortBy,
      sortOrder,
    });

    return res.status(200).json(data);
  };
};
