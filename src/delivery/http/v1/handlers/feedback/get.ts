import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';
import { NotFoundError } from '@/domain/errors';

type Params = Pick<DeliveryParams, 'feedback'>;

export type GetFeedbacks = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildGetFeedbacks = ({
  feedback,
}: Params): GetFeedbacks => {
  return async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;


    const { feedbacks, total } = await feedback.pagination({ page, pageSize });
    if (!feedbacks || feedbacks.length === 0) {
      throw new NotFoundError({
        message: 'No feedbacks found for the given parameters',
        code: 'FEEDBACKS_NOT_FOUND',
      });
    }

    return res.status(200).json({
      feedbacks,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  };
};
