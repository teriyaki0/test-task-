import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildExampleUseCase, ExampleUseCase } from './example'
import { buildFeedbackUseCase, FeedbackUseCase } from './feedback';
import { UseCaseParams } from './types';

export type UseCase = {
  auth: AuthUseCase;
  feedback: FeedbackUseCase;
  example: ExampleUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const feedback = buildFeedbackUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    feedback,
    auth,
    example
  }
}
