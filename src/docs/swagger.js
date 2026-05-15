import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Filmes',
            version: '1.0.0',
            description: 'Documentação completa da API de Filmes com autenticação JWT',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Filme: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '6847f2a3c1e4b2d3e5f6a7b8' },
                        titulo: { type: 'string', example: 'Interestelar' },
                        genero: { type: 'string', example: 'Ficção Científica' },
                        ano: { type: 'integer', example: 2014 },
                        nota: { type: 'number', example: 8.6 },
                    },
                },
                FilmeInput: {
                    type: 'object',
                    required: ['titulo', 'genero', 'ano', 'nota'],
                    properties: {
                        titulo: { type: 'string', example: 'Interestelar' },
                        genero: { type: 'string', example: 'Ficção Científica' },
                        ano: { type: 'integer', example: 2014 },
                        nota: { type: 'number', example: 8.6 },
                    },
                },
                FilmeUpdateInput: {
                    type: 'object',
                    properties: {
                        titulo: { type: 'string', example: 'Interestelar' },
                        genero: { type: 'string', example: 'Ficção Científica' },
                        ano: { type: 'integer', example: 2014 },
                        nota: { type: 'number', example: 8.6 },
                    },
                },
                Usuario: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '6847f2a3c1e4b2d3e5f6a7b8' },
                        name: { type: 'string', example: 'João Silva' },
                        email: { type: 'string', example: 'joao@email.com' },
                    },
                },
                UsuarioInput: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: { type: 'string', example: 'João Silva' },
                        email: { type: 'string', example: 'joao@email.com' },
                        password: { type: 'string', example: '123456' },
                    },
                },
                LoginInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', example: 'joao@email.com' },
                        password: { type: 'string', example: '123456' },
                    },
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'João Silva' },
                        email: { type: 'string', example: 'joao@email.com' },
                        token: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                        },
                    },
                },
                Erro: {
                    type: 'object',
                    properties: {
                        erro: { type: 'string', example: 'Mensagem de erro' },
                    },
                },
            },
        },
        paths: {
            '/api/filmes': {
                get: {
                    summary: 'Lista todos os filmes',
                    tags: ['Filmes'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'query',
                            name: 'titulo',
                            schema: { type: 'string' },
                            description: 'Filtrar por título',
                        },
                        {
                            in: 'query',
                            name: 'genero',
                            schema: { type: 'string' },
                            description: 'Filtrar por gênero',
                        },
                        {
                            in: 'query',
                            name: 'ano',
                            schema: { type: 'integer' },
                            description: 'Filtrar por ano',
                        },
                        {
                            in: 'query',
                            name: 'page',
                            schema: { type: 'integer', default: 1 },
                            description: 'Número da página',
                        },
                        {
                            in: 'query',
                            name: 'limit',
                            schema: { type: 'integer', default: 10 },
                            description: 'Quantidade de itens por página',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Lista de filmes retornada com sucesso',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Filme' },
                                    },
                                },
                            },
                        },
                        401: { description: 'Token não informado ou inválido' },
                    },
                },
                post: {
                    summary: 'Cria um novo filme',
                    tags: ['Filmes'],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/FilmeInput' },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Filme criado com sucesso',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Filme' },
                                },
                            },
                        },
                        400: { description: 'Dados inválidos' },
                        401: { description: 'Token não informado ou inválido' },
                    },
                },
            },
            '/api/filmes/{id}': {
                get: {
                    summary: 'Busca um filme pelo ID',
                    tags: ['Filmes'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                            description: 'ID do filme',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Filme encontrado',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Filme' },
                                },
                            },
                        },
                        404: { description: 'Filme não encontrado' },
                        401: { description: 'Token não informado ou inválido' },
                    },
                },
                put: {
                    summary: 'Atualiza um filme',
                    tags: ['Filmes'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                            description: 'ID do filme',
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/FilmeUpdateInput' },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Filme atualizado com sucesso',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Filme' },
                                },
                            },
                        },
                        400: { description: 'Dados inválidos' },
                        404: { description: 'Filme não encontrado' },
                        401: { description: 'Token não informado ou inválido' },
                    },
                },
                delete: {
                    summary: 'Deleta um filme',
                    tags: ['Filmes'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                            description: 'ID do filme',
                        },
                    ],
                    responses: {
                        200: { description: 'Filme deletado com sucesso' },
                        404: { description: 'Filme não encontrado' },
                        401: { description: 'Token não informado ou inválido' },
                    },
                },
            },
            '/api/users': {
                get: {
                    summary: 'Lista todos os usuários',
                    tags: ['Usuários'],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Lista de usuários retornada com sucesso',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Usuario' },
                                    },
                                },
                            },
                        },
                        401: { description: 'Token não informado ou inválido' },
                    },
                },
                post: {
                    summary: 'Cadastra um novo usuário',
                    tags: ['Usuários'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UsuarioInput' },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Usuário cadastrado com sucesso',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/LoginResponse' },
                                },
                            },
                        },
                        400: { description: 'E-mail já cadastrado ou dados inválidos' },
                    },
                },
            },
            '/api/users/login': {
                post: {
                    summary: 'Realiza login',
                    tags: ['Usuários'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/LoginInput' },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Login realizado com sucesso',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/LoginResponse' },
                                },
                            },
                        },
                        400: { description: 'E-mail ou senha inválidos' },
                    },
                },
            },
        },
    },
    apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
