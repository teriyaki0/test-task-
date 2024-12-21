import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'user'>;

export type GetProfile = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildGetProfile = ({ user }: Params): GetProfile => {
  return async (req, res) => {
    const profileData = await user.get({
      id: req.user?.id
    });

    return res.status(200).json(profileData);
  };
};
