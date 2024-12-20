import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildCategoryRepository, CategoryRepository } from './repository/category';
import { buildFeedbackRepository, FeedbackRepository } from './repository/feedback';
import { buildStatusRepository, StatusRepository } from './repository/status';
import { buildUpvoteRepository, UpvoteRepository } from './repository/upvotes';
import { buildUserRepository, UserRepository } from './repository/user';
import { AdapterParams } from './types';

export type Adapter = {
  userRepository: UserRepository;
  upvoteRepository: UpvoteRepository;
  feedbackRepository: FeedbackRepository;
  exampleGateway: ExampleGateway;
  categoryRepository: CategoryRepository; 
  statusRepository: StatusRepository
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const feedbackRepository = buildFeedbackRepository(params);
  const categoryRepository = buildCategoryRepository(params);
  const statusRepository = buildStatusRepository(params);
  const upvoteRepository = buildUpvoteRepository(params)
  const userRepository = buildUserRepository(params);
  const exampleGateway = buildExampleGateway(params);

  return {
    feedbackRepository,
    statusRepository,
    categoryRepository,
    userRepository,
    exampleGateway,
    upvoteRepository
  }
}
