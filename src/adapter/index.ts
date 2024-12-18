import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildFeedbackRepository, FeedbackRepository } from './repository/feedback';
import { buildUserRepository, UserRepository } from './repository/user';
import { AdapterParams } from './types';

export type Adapter = {
  userRepository: UserRepository;
  feedbackRepository: FeedbackRepository,
  exampleGateway: ExampleGateway;
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const exampleGateway = buildExampleGateway(params);
  const feedbackRepository = buildFeedbackRepository(params);

  return {
    feedbackRepository,
    userRepository,
    exampleGateway
  }
}
