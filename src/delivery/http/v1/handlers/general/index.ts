import Express from 'express';
import { createRouteHandler } from '../../routeHandler';
import {  IHandler } from '../types';
import { buildGetCategories, getCategories } from './category';
import { DeliveryParams } from '@/delivery/types';
import { buildGetStatuses, getStatuses } from './status';

export type GeneralMethods = {
  category: getCategories;
  status: getStatuses;
};

type Params = Pick<DeliveryParams, 'category' | 'status'>;


const buildGeneralRoutes = (methods: GeneralMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /categories:
     *   get:
     *     tags: [General]
     *     description: Retrieve all categories from Prisma.
     *     responses:
     *       200:
     *         description: List of all categories.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     */
    namespace.get(
      '/categories',
      createRouteHandler(methods.category)
    )

    /**
     * @openapi
     * /statuses:
     *   get:
     *     tags: [General]
     *     description: Retrieve all statuses from Prisma.
     *     responses:
     *       200:
     *         description: List of all statuses.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     */
    namespace.get(
      '/statuses',
      createRouteHandler(methods.status)
    );


    root.use('/', namespace);
  };
};

export const buildGeneralHandler = (params: Params): IHandler => {
  const category = buildGetCategories(params);
  const status = buildGetStatuses(params);

  return {
    registerRoutes: buildGeneralRoutes({
      category,
      status
    })
  };
};
