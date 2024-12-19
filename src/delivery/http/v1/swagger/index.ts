import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import Express from 'express';
import swaggerUI from 'swagger-ui-express';

export const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    servers: [{ url: '/api/v1' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/delivery/http/v1/handlers/**/*.ts', './src/domain/entity/**/*.ts'],
};

export const buildSwagger = () => {
  const swagger = Express.Router();

  const openapiSpecification = swaggerJSDoc(options);

  swagger.use('/swagger', swaggerUI.serve, swaggerUI.setup(openapiSpecification));
  swagger.get('/swagger.json', (req, res) => {
    res.status(200).json(openapiSpecification);
  });

  return swagger;
};
