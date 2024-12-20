import { UseCaseParams } from '@/domain/usecase/types';
import { buildUpvote, Upvote } from './upvote';

export type UpvoteUseCase = {
    create: Upvote;
};

export const buildUpvoteUseCase = (params: UseCaseParams): UpvoteUseCase => {
  const create = buildUpvote(params)

  return {
    create
  };
};
