import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-gerado do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *       example:
 *         id: "98765-zyxw"
 *         name: "Augusto Freitas"
 *         email: "augusto@teste.com"
 *
 *     UserCreateInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: Email válido do usuário
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 *       example:
 *         name: "Augusto Freitas"
 *         email: "augusto@teste.com"
 *         password: "senhaSegura123"
 *
 *     UserLoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         email: "augusto@teste.com"
 *         password: "senhaSegura123"
 */

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: API para gerenciamento de usuários e autenticação
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de usuários cadastrados (não exibe senhas).
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', UserController.listar);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Recebe email e password e retorna um token de autenticação caso válido.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso. Retorna o token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para acessar rotas protegidas
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas (email ou password incorretos).
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Registra um novo usuário no sistema exigindo name, email e password.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Erro de validação dos dados ou usuário já existe.
 */
router.post('/', UserController.create);

export default router;
