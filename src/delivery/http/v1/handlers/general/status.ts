import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'status'>;

export type getStatuses = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildGetStatuses = ({ status }: Params): getStatuses => {
  return async (req, res) => {
    const statuses = await status.list();
    return res.status(200).json(statuses);
  };
};
