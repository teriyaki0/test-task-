import { AdapterParams } from '@/adapter/types';
import { IFeedback } from '@/domain/entity/feedback';

type Params = Pick<AdapterParams, 'db'>;

export type GetAll = () => Promise<Array<IFeedback> | never>;

export const buildGetAll = ({ db }: Params): GetAll => {
  return async () => {
    const feedbacks = await db.client.feedback.findMany();

    return feedbacks as Array<IFeedback>;
  };
};
