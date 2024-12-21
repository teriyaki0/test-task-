import { UseCaseParams } from '@/domain/usecase/types';
import { IUser } from '@/domain/entity/user';
import { NotFoundError } from '@/domain/errors';

export type Update = (data: {
  id: string;
  email?: string; 
  avatar?: string;
}) => Promise<IUser | never>;

export const buildUpdate = ({ adapter }: UseCaseParams): Update => {
  return async ({ id, email, avatar }) => {
    const user = await adapter.userRepository.get({
      where: { id },
      select: {
        email: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new NotFoundError({
        code: 'USER_NOT_FOUND',
        message: `User with ID ${id} not found.`,
      });
    }

    const updatedUser = await adapter.userRepository.update({
      where: { id },
      data: {
        email: email || user.email, 
        avatar: avatar || user.avatar,
      },
    });

    return updatedUser;
  };
};
