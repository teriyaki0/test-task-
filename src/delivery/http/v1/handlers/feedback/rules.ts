import { check, header, param } from 'express-validator'
import { authRequired, validateSchema } from '../../middlewares'

/**
 * @openapi
 * components:
 *   rules:
 *     upvoteFeedback:
 *       required:
 *         - feedbackId
 *         - userId
 *       properties:
 *         feedbackId:
 *           type: string
 *           description: The ID of the feedback to upvote
 *         userId:
 *           type: string
 *           description: The ID of the user performing the upvote
 */
export const upvoteFeedbackRules = [
  header('authorization').exists().notEmpty().isString().withMessage('Authorization header is required and must be a string.'),
  authRequired({}),
  param('id').exists().notEmpty().isString().withMessage('Feedback ID is required and must be a string.').bail(),
  validateSchema
];


/**
  * @openapi
  * components:
  *   rules:
  *     createFeedback:
  *       required:
  *         - title
  *         - description
  *         - categoryId
  *         - statusId
  *       properties:
  *         title:
  *           type: string
  *           description: The title of the feedback
  *         description:
  *           type: string
  *           description: The description of the feedback
  *         categoryId:
  *           type: string
  *           description: The category ID of the feedback
  *         statusId:
  *           type: string
  *           description: The status ID of the feedback (e.g., "new", "resolved")
  */
export const createFeedbackRules = [
  header('authorization').exists().notEmpty().isString().withMessage('Authorization header is required and must be a string.'),
  authRequired({}),
  check('title').exists().notEmpty().isString().withMessage('Title is required and must be a string.'),
  check('description').exists().notEmpty().isString().withMessage('Description is required and must be a string.'),
  check('categoryId').exists().notEmpty().isString().withMessage('Category ID is required and must be a string.'),
  check('statusId').exists().notEmpty().isString().withMessage('Status ID is required and must be a string.'),
  validateSchema
];

/**
  * @openapi
  * components:
  *   rules:
  *     updateFeedback:
  *       required:
  *         - id
  *       properties:
  *         id:
  *           type: string
  *           description: The ID of the feedback to update
  *         title:
  *           type: string
  *           description: The title of the feedback
  *         description:
  *           type: string
  *           description: The description of the feedback
  *         categoryId:
  *           type: string
  *           description: The category ID of the feedback
  *         statusId:
  *           type: string
  *           description: The status ID of the feedback
  */
export const updateFeedbackRules = [
  header('authorization').exists().notEmpty().isString().withMessage('Authorization header is required and must be a string.'),
  authRequired({}),
  check('id').exists().notEmpty().isString().withMessage('Feedback ID is required and must be a string.'),
  check('title').optional().isString().withMessage('Title must be a string if provided.'),
  check('description').optional().isString().withMessage('Description must be a string if provided.'),
  check('categoryId').optional().isString().withMessage('Category ID must be a string if provided.'),
  check('statusId').optional().isString().withMessage('Status ID must be a string if provided.'),
  validateSchema
];

/**
  * @openapi
  * components:
  *   rules:
  *     getFeedback:
  *       required:
  *         - id
  *       properties:
  *         id:
  *           type: string
  *           description: The ID of the feedback to retrieve
  */
export const getFeedbackRules = [
  header('authorization').exists().notEmpty().isString().withMessage('Authorization header is required and must be a string.'),
  authRequired({}),
  check('id').exists().notEmpty().isString().withMessage('Feedback ID is required and must be a string.'),
  validateSchema
];

/**
  * @openapi
  * components:
  *   rules:
  *     deleteFeedback:
  *       required:
  *         - id
  *       properties:
  *         id:
  *           type: string
  *           description: The ID of the feedback to delete
  */
export const deleteFeedbackRules = [
  header('authorization').exists().notEmpty().isString().withMessage('Authorization header is required and must be a string.'),
  authRequired({}),
  check('id').exists().notEmpty().isString().withMessage('Feedback ID is required and must be a string.'),
  validateSchema
];

/**
 * @openapi
 * components:
 *   rules:
 *     pagination:
 *       properties:
 *         page:
 *           type: integer
 *           description: The page number for pagination
 *         pageSize:
 *           type: integer
 *           description: The number of items per page
 */
export const paginationRules = [
  check('page')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Page must be a positive integer greater than 0'),
  check('pageSize')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('PageSize must be a positive integer greater than 0'),
  validateSchema,
];
