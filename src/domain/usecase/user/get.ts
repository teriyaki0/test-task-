import {UseCaseParams} from '@/domain/usecase/types';
import {IUser} from '@/domain/entity/user';
import { NotFoundError } from '@/domain/errors';

export type Get = (data: {
  id: string,
}) =>
    Promise<IUser | never>
export const buildGet = ({adapter}: UseCaseParams): Get=>{
  return async ({id})=>{
    const user = await adapter.userRepository.get({
      where: {
        id
      },
      select: {
        email: true,
        avatar: true,
      }
    })

    if (!user){
      throw new NotFoundError({
        code: 'USER_NOT_FOUND'
      })
    }

    return user
  }
}
