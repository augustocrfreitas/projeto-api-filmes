import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Filmes',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Verifique se esse caminho está apontando para a pasta correta das suas rotas
    apis: ['./src/routes/*.js'],
};

// Apenas exportamos a configuração. Nada de "app.use" aqui!
export const swaggerSpec = swaggerJsdoc(swaggerOptions);
