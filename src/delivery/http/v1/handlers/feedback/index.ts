import Express from 'express';
import { buildCreateFeedback, CreateFeedback } from './create';
import { buildGetByIdFeedback, GetByIdFeedback } from './getById';
import { buildUpdateFeedback, UpdateFeedback } from './update';
import { buildDeleteFeedback, DeleteFeedback } from './detete';
import { DeliveryParams } from '@/delivery/types';
import { createRouteHandler } from '../../routeHandler';
import { getFeedbackRules, deleteFeedbackRules, createFeedbackRules, updateFeedbackRules, upvoteFeedbackRules } from './rules';
import { IHandler } from '../types';
import { buildUpvoteFeedback, UpvoteFeedback } from './upvote';
import { buildGet, Get } from './get';

type Params = Pick<DeliveryParams, 'feedback' | 'upvote'>;

export type FeedbackMethods = {
  create: CreateFeedback;
  getById: GetByIdFeedback;
  update: UpdateFeedback;
  delete: DeleteFeedback;
  upvote: UpvoteFeedback;
  get: Get;
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
     *         description: Page number for pagination
     *       - in: query
     *         name: pageSize
     *         required: false
     *         schema:
     *           type: integer
     *         description: Number of items per page
     *       - in: query
     *         name: category
     *         required: false
     *         schema:
     *           type: string
     *         description: Filter by category
     *       - in: query
     *         name: status
     *         required: false
     *         schema:
     *           type: string
     *         description: Filter by status
     *       - in: query
     *         name: sortBy
     *         required: false
     *         schema:
     *           type: string
     *           enum: [createdAt, votes]
     *         description: Sort by field
     *       - in: query
     *         name: sortOrder
     *         required: false
     *         schema:
     *           type: string
     *           enum: [asc, desc]
     *         description: Sort order
     *     responses:
     *       200:
     *         description: Paginated list of feedbacks
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 feedbacks:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Feedback'
     *                 total:
     *                   type: integer
     *                 page:
     *                   type: integer
     *                 pageSize:
     *                   type: integer
     */
    namespace.get(
      '/',
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
  const get = buildGet(params);

  return {
    registerRoutes: buildFeedbackRoutes({
      get,
      create,
      getById,
      update,
      delete: deleteFeedback,
      upvote
    })
  };
};
