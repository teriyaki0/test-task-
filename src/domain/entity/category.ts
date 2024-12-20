import { Category } from '@prisma/client';

export interface ICategory extends Category {}
/**
 * @openapi
 * components:
 *   schemas:
 *      Category:
 *          required:
 *            - id
 *            - name
 *            - created_at
 *            - updated_at
 *          properties:
 *            id:
 *                type: string
 *            name:
 *                type: string
 *            created_at:
 *                type: string
 *                format: date
 *            updated_at:
 *                type: string
 *                format: date
 */