import { Feedback } from '@prisma/client';

export interface IFeedback extends Feedback {}

/**
 * @openapi
 * components:
 *   schemas:
 *      Feedback:
 *          required:
 *            - id
 *            - title
 *            - description
 *            - category
 *            - status
 *            - author_id
 *            - created_at
 *            - updated_at
 *          properties:
 *            id:
 *                type: string
 *            title:
 *                type: string
 *            description:
 *                type: string
 *            category:
 *                type: string
 *            status:
 *                type: string
 *            author_id:
 *                type: string
 *            created_at:
 *                type: string
 *                format: date
 *            updated_at:
 *                type: string
 *                format: date
 */
