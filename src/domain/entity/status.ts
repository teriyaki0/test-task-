import { Status } from '@prisma/client';

export interface IStatus extends Status {}
/**
 * @openapi
 * components:
 *   schemas:
 *      Status:
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