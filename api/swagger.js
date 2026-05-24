const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); 

const host = process.env.APP_HOST || 'localhost';
const port = process.env.APP_PORT || 3000;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Estoque API',
    version: '1.0.0',
    description: 'Documentação da API',
  },
  servers: [
    {
      url: `http://${host}:${port}`,
      description: 'API Estoque',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token no formato: Bearer {token}'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./share/docs/tags.yaml'], // Caminho para os arquivos que contém as definições da API
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      requestInterceptor: (request) => {
        request.headers['Accept'] = '*/*';
        return request;
      }
    }
  }));
};
