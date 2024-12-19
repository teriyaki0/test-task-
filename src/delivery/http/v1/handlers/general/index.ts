import Express, { Response } from 'express';
import { createRouteHandler } from '../../routeHandler';
import { AuthRequest, IHandler } from '../types';
import { getCategoriesFromPrisma } from './category';
import { getStatusesFromPrisma } from './status';

const buildGeneralRoutes = () => {
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
      createRouteHandler(async (req: AuthRequest, res: Response) => {
        const categories = await getCategoriesFromPrisma();
        return res.json(categories); 
      })
    );

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
      createRouteHandler(async (req: AuthRequest, res: Response) => {
        const statuses = await getStatusesFromPrisma();
        return res.json(statuses); 
      })
    );


    root.use('/', namespace);
  };
};

export const buildGeneralHandler = (): IHandler => {
  return {
    registerRoutes: buildGeneralRoutes()
  };
};
