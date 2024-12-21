/**
 * @openapi
 * components:
 *   rules:
 *     getProfile:
 *       security:
 *         - bearerAuth: []
 */
import { body, header } from 'express-validator';
import { authRequired, validateSchema } from '../../middlewares'

export const getProfileRules = [
  header('authorization')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('Authorization header is required and must be a string.'),
  authRequired({}),
  validateSchema,
];


/**
 * @openapi
 * components:
 *   rules:
 *     updateProfile:
 *       security:
 *         - bearerAuth: []
 *       required:
 *         - email
 *         - avatar
 *       properties:
 *         email:
 *           type: string
 *           description: New email address
 *         avatar:
 *           type: string
 *           description: New avatar URL
 */
export const updateProfileRules = [
  header('authorization')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('Authorization header is required and must be a string.'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('avatar')
    .optional()
    .isString()
    .isURL()
    .withMessage('Avatar must be a valid URL.'),
  authRequired({}),
  validateSchema,
];