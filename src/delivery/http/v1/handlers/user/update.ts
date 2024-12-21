import { Response } from 'express';
import { AuthRequest } from '../types';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'user'>;

export type UpdateProfile = (
  req: AuthRequest,
  res: Response
) => Promise<Response>;

export const buildUpdateProfile = ({ user }: Params): UpdateProfile => {
  return async (req, res) => {
    const { email, avatar } = req.body;

    const updatedProfile = await user.update({
      id: req.user?.id,
      email,
      avatar
    });

    return res.status(200).json(updatedProfile);
  };
};
