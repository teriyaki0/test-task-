import Express from 'express';
import { buildCreateFeedback, CreateFeedback } from './create';
import { buildGetByIdFeedback, GetByIdFeedback } from './getById';
import { buildUpdateFeedback, UpdateFeedback } from './update';
import { buildDeleteFeedback, DeleteFeedback } from './detete';
import { DeliveryParams } from '@/delivery/types';
import { createRouteHandler } from '../../routeHandler';
import { getFeedbackRules, deleteFeedbackRules, createFeedbackRules, updateFeedbackRules, paginationRules, upvoteFeedbackRules } from './rules';
import { IHandler } from '../types';
import { buildGetFeedbacks, GetFeedbacks } from './get';
import { buildUpvoteFeedback, UpvoteFeedback } from './upvote';

type Params = Pick<DeliveryParams, 'feedback' | 'upvote'>;

export type FeedbackMethods = {
  get: GetFeedbacks;
  create: CreateFeedback;
  getById: GetByIdFeedback;
  update: UpdateFeedback;
  delete: DeleteFeedback;
  upvote: UpvoteFeedback;
};

const buildFeedbackRoutes = (methods: FeedbackMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /feedback:
     *   get:
     *     tags: [Feedback]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: query
     *         name: page
     *         required: false
     *         schema:
     *           type: integer
     *           default: 1
     *       - in: query
     *         name: pageSize
     *         required: false
     *         schema:
     *           type: integer
     *           default: 10
     *     responses:
     *       200:
     *         description: Paginated feedbacks.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Feedback'
     */
    namespace.get(
      '/',
      paginationRules,
      createRouteHandler(methods.get)
    );


    /**
     * @openapi
     * /feedback:
     *   post:
     *     tags: [Feedback]
     *     produces:
     *       - application/json
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *                $ref: '#/components/rules/createFeedback'
     *     responses:
     *       201:
     *         description: Created feedback.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Feedback'
     */

    namespace.post(
      '/',
      createFeedbackRules,
      createRouteHandler(methods.create),
    );

    /**
     * @openapi
     * /feedback/{id}:
     *   get:
     *     tags: [Feedback]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Retrieved feedback.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Feedback'
     */
    namespace.get(
      '/:id',
      createRouteHandler(methods.getById),
      getFeedbackRules
    );

    /**
     * @openapi
     * /feedback/{id}:
     *   put:
     *     tags: [Feedback]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *                $ref: '#/components/rules/updateFeedback'
     *     responses:
     *       200:
     *         description: Updated feedback.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Feedback'
     */
    namespace.put(
      '/:id',
      createRouteHandler(methods.update),
      updateFeedbackRules
    );

    /**
     * @openapi
     * /feedback/{id}:
     *   delete:
     *     tags: [Feedback]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Deleted feedback.
     */
    namespace.delete(
      '/:id',
      createRouteHandler(methods.delete),
      deleteFeedbackRules
    );

    /**
     * @openapi
     * /feedback/{id}/upvote:
     *   post:
     *     tags: [Feedback]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Upvoted feedback.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Feedback'
     */
    namespace.post(
      '/:id/upvote',
      upvoteFeedbackRules,
      createRouteHandler(methods.upvote)
    );

    root.use('/feedback', namespace);
  };
};

export const buildFeedbackHandler = (params: Params): IHandler => {
  const upvote = buildUpvoteFeedback(params);
  const create = buildCreateFeedback(params);
  const getById = buildGetByIdFeedback(params);
  const update = buildUpdateFeedback(params);
  const deleteFeedback = buildDeleteFeedback(params);
  const get = buildGetFeedbacks(params);

  return {
    registerRoutes: buildFeedbackRoutes({
      create,
      getById,
      update,
      delete: deleteFeedback,
      get,
      upvote
    })
  };
};
