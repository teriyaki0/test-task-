import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildExampleUseCase, ExampleUseCase } from './example'
import { buildFeedbackUseCase, FeedbackUseCase } from './feedback';
import { UseCaseParams } from './types';
import { buildUpvoteUseCase, UpvoteUseCase } from './upvote';

export type UseCase = {
  auth: AuthUseCase;
  upvote: UpvoteUseCase;
  feedback: FeedbackUseCase;
  example: ExampleUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const upvote = buildUpvoteUseCase(params)
  const feedback = buildFeedbackUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    feedback,
    upvote,
    auth,
    example
  }
}
