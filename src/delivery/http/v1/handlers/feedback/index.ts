import Express from 'express';
import { buildCreateFeedback, CreateFeedback } from './create';
import { buildGetByIdFeedback, GetByIdFeedback } from './getById';
import { buildUpdateFeedback, UpdateFeedback } from './update';
import { buildDeleteFeedback, DeleteFeedback } from './delete';
import { DeliveryParams } from '@/delivery/types';
import { createRouteHandler } from '../../routeHandler';
import { getFeedbackRules, deleteFeedbackRules, createFeedbackRules, updateFeedbackRules, upvoteFeedbackRules, getFeedbacksRules } from './rules';
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
     *           description: The page number for pagination
     *           example: 1
     *       - in: query
     *         name: pageSize
     *         required: false
     *         schema:
     *           type: integer
     *           description: The number of items per page
     *           example: 10
     *       - in: query
     *         name: category
     *         required: false
     *         schema:
     *           type: string
     *           description: Filter by category
     *           example: "electronics"
     *       - in: query
     *         name: status
     *         required: false
     *         schema:
     *           type: string
     *           description: Filter by status
     *           example: "active"
     *       - in: query
     *         name: sortBy
     *         required: false
     *         schema:
     *           type: string
     *           enum: [createdAt, votes]
     *           description: Sort by field
     *           example: "createdAt"
     *       - in: query
     *         name: sortOrder
     *         required: false
     *         schema:
     *           type: string
     *           enum: [asc, desc]
     *           description: Sort order
     *           example: "asc"
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
     *                     $ref: '#/components/entities/Feedback'
     *                 total:
     *                   type: integer
     *                 page:
     *                   type: integer
     *                 pageSize:
     *                   type: integer
     */
    namespace.get(
      '/',
      getFeedbacksRules,
      createRouteHandler(methods.get)
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
     *                      $ref: '#/components/entities/Feedback'
     */
    namespace.get(
      '/:id',
      getFeedbackRules,
      createRouteHandler(methods.getById),
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
     *                $ref: '#/components/entities/Feedback'
     */
    namespace.post(
      '/',
      createFeedbackRules,
      createRouteHandler(methods.create),
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
     *               $ref: '#/components/entities/Feedback'
     */
    namespace.put(
      '/:id',
      updateFeedbackRules,
      createRouteHandler(methods.update),
      
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
      deleteFeedbackRules,
      createRouteHandler(methods.delete),
      
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
     *               $ref: '#/components/entities/Feedback'
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
  const getById = buildGetByIdFeedback(params);
  const create = buildCreateFeedback(params);
  const update = buildUpdateFeedback(params);
  const deleteFeedback = buildDeleteFeedback(params);
  const get = buildGet(params);

  return {
    registerRoutes: buildFeedbackRoutes({
      get,
      getById,
      create,
      update,
      delete: deleteFeedback,
      upvote
    })
  };
};