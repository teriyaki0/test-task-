import { check, header } from 'express-validator'
import { authRequired, validateSchema } from '../../middlewares'

/**
  * @openapi
  * components:
  *   rules:
  *     createFeedback:
  *       required:
  *         - title
  *         - description
  *         - category
  *       properties:
  *         title:
  *           type: string
  *           description: The title of the feedback
  *         description:
  *           type: string
  *           description: The description of the feedback
  *         category:
  *           type: string
  *           description: The category of the feedback
  *         status:
  *           type: string
  *           description: The status of the feedback (e.g., "new", "resolved")
  */
export const createFeedbackRules = [
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  check('title').exists().notEmpty().isString(),
  check('description').exists().notEmpty().isString(),
  check('category').exists().notEmpty().isString(),
  check('status').optional().isString(),
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
  *         category:
  *           type: string
  *           description: The category of the feedback
  *         status:
  *           type: string
  *           description: The status of the feedback
  */
export const updateFeedbackRules = [
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  check('id').exists().notEmpty().isString(),
  check('title').optional().isString(),
  check('description').optional().isString(),
  check('category').optional().isString(),
  check('status').optional().isString(),
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
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  check('id').exists().notEmpty().isString(),
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
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  check('id').exists().notEmpty().isString(),
  validateSchema
];
