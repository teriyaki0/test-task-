import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildCategoryUseCase, CategoryUseCase } from './category';
import { buildExampleUseCase, ExampleUseCase } from './example'
import { buildFeedbackUseCase, FeedbackUseCase } from './feedback';
import { buildStatusUseCase, StatusUseCase } from './status';
import { UseCaseParams } from './types';
import { buildUpvoteUseCase, UpvoteUseCase } from './upvote';
import { buildUserUseCase, UserUseCase } from './user';

export type UseCase = {
  auth: AuthUseCase;
  upvote: UpvoteUseCase;
  feedback: FeedbackUseCase;
  category: CategoryUseCase;
  status: StatusUseCase;
  user: UserUseCase;
  example: ExampleUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const user = buildUserUseCase(params);
  const upvote = buildUpvoteUseCase(params)
  const feedback = buildFeedbackUseCase(params);
  const category = buildCategoryUseCase(params);
  const status = buildStatusUseCase(params);

  const example = buildExampleUseCase(params);

  return {
    feedback,
    user,
    status,
    upvote,
    category,
    auth,
    example
  }
}
