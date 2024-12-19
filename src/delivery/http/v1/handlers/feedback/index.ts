import Express from 'express';
import { buildCreateFeedback, CreateFeedback } from './create';
import { buildGetFeedback, GetFeedback } from './get';
import { buildGetAllFeedbacks, GetAllFeedbacks } from './getAll';
import { buildUpdateFeedback, UpdateFeedback } from './update';
import { buildDeleteFeedback, DeleteFeedback } from './detete';
import { DeliveryParams } from '@/delivery/types';
import { createRouteHandler } from '../../routeHandler';
import { getFeedbackRules, deleteFeedbackRules, createFeedbackRules, updateFeedbackRules  } from './rules';
import { IHandler } from '../types';

type Params = Pick<DeliveryParams, 'feedback'>;

export type FeedbackMethods = {
  create: CreateFeedback;
  get: GetFeedback;
  update: UpdateFeedback;
  delete: DeleteFeedback;
  getAll: GetAllFeedbacks;
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
     *     responses:
     *       200:
     *         description: Retrieved all feedbacks.
     *         content:
     *           application/json:
     *              schema:
     *                $ref: '#/components/rules/refreshToken'
     */
    namespace.get(
      '/',
      createRouteHandler(methods.getAll),
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
      createRouteHandler(methods.get),
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

    root.use('/feedback', namespace);
  };
};

export const buildFeedbackHandler = (params: Params): IHandler => {
  const create = buildCreateFeedback(params);
  const get = buildGetFeedback(params);
  const update = buildUpdateFeedback(params);
  const deleteFeedback = buildDeleteFeedback(params);
  const getAll = buildGetAllFeedbacks(params);

  return {
    registerRoutes: buildFeedbackRoutes({
      create,
      get,
      update,
      getAll,
      delete: deleteFeedback
    })
  };
};
