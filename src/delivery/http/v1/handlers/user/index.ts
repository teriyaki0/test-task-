import Express from 'express';
import { buildGetProfile, GetProfile } from './get';
import { DeliveryParams } from '@/delivery/types';
import { createRouteHandler } from '../../routeHandler';
import { IHandler } from '../types';
import { getProfileRules, updateProfileRules } from './rules';
import { buildUpdateProfile, UpdateProfile } from './update';

type Params = Pick<DeliveryParams, 'user'>;

export type ProfileMethods = {
  getProfile: GetProfile;
  updateProfile: UpdateProfile;
};

const buildProfileRoutes = (methods: ProfileMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /profile:
     *   get:
     *     tags: [Profile]
     *     security:
     *      - bearerAuth: []
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *           description: User profile.
     *           content:
     *              application/json:
     *                schema:
     *                      $ref: '#/components/entities/User'
     */
    namespace.get(
      '/',
      getProfileRules,
      createRouteHandler(methods.getProfile)
    );

    /**
     * @openapi
     * /profile:
     *   patch:
     *     tags: [Profile]
     *     security:
     *      - bearerAuth: []
     *     produces:
     *       - application/json
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/updateProfile'
     *     responses:
     *        200:
     *           description: Updated user profile.
     *           content:
     *              application/json:
     *                schema:
     *                      $ref: '#/components/entities/User'
     */
    namespace.patch(
      '/',
      updateProfileRules,
      createRouteHandler(methods.updateProfile)
    );

    root.use('/profile', namespace);
  };
};

export const buildProfileHandler = (params: Params): IHandler => {
  const getProfile = buildGetProfile(params);
  const updateProfile = buildUpdateProfile(params);

  return {
    registerRoutes: buildProfileRoutes({
      getProfile,
      updateProfile,
    }),
  };
};
