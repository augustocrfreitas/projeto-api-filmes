import FilmeController from '../controllers/filmeController.js';
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validarCreateFilme, validarUpdateFilme } from '../middlewares/filmeMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Filme:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-gerado do filme
 *         titulo:
 *           type: string
 *           description: Título do filme
 *         genero:
 *           type: string
 *           description: Gênero do filme
 *         ano:
 *           type: integer
 *           description: Ano de lançamento
 *         nota:
 *           type: number
 *           description: Nota de avaliação do filme
 *       example:
 *         id: "12345-abcde"
 *         titulo: "O Auto da Compadecida"
 *         genero: "Comédia"
 *         ano: 2000
 *         nota: 9.5
 *
 *     FilmeCreateInput:
 *       type: object
 *       required:
 *         - titulo
 *         - genero
 *         - ano
 *         - nota
 *       properties:
 *         titulo:
 *           type: string
 *           minLength: 1
 *         genero:
 *           type: string
 *           minLength: 1
 *         ano:
 *           type: integer
 *           minimum: 1900
 *           maximum: 2026
 *         nota:
 *           type: number
 *           minimum: 0
 *           maximum: 10
 *       example:
 *         titulo: "O Auto da Compadecida"
 *         genero: "Comédia"
 *         ano: 2000
 *         nota: 9.5
 *
 *     FilmeUpdateInput:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           minLength: 1
 *         genero:
 *           type: string
 *           minLength: 1
 *         ano:
 *           type: integer
 *           minimum: 1900
 *           maximum: 2026
 *         nota:
 *           type: number
 *           minimum: 0
 *           maximum: 10
 *       example:
 *         nota: 10
 */

/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: API para gerenciamento de filmes
 */

/**
 * @swagger
 * /api/filmes:
 *   get:
 *     summary: Lista todos os filmes (com filtros opcionais)
 *     description: Retorna a lista de filmes. Pode ser filtrada por título, gênero e ano usando query parameters.
 *     tags: [Filmes]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Filtra os filmes por parte do título
 *       - in: query
 *         name: genero
 *         schema:
 *           type: string
 *         description: Filtra os filmes pelo gênero
 *       - in: query
 *         name: ano
 *         schema:
 *           type: integer
 *         description: Filtra os filmes pelo ano de lançamento exato
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filme'
 */
router.get('/', FilmeController.buscar);

/**
 * @swagger
 * /api/filmes/{id}:
 *   get:
 *     summary: Busca um filme pelo ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filme'
 *       404:
 *         description: Filme não encontrado.
 */
router.get('/:id', FilmeController.buscarFilme);

/**
 * @swagger
 * /api/filmes/{id}:
 *   put:
 *     summary: Atualiza um filme pelo ID
 *     description: Atualiza os dados de um filme. Todos os campos são opcionais. Requer autenticação.
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmeUpdateInput'
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso.
 *       400:
 *         description: Erro de validação dos dados enviados.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Filme não encontrado.
 */
router.put('/:id', authMiddleware, validarUpdateFilme, FilmeController.alterar);

/**
 * @swagger
 * /api/filmes:
 *   post:
 *     summary: Cria um novo filme
 *     description: Cadastra um novo filme no sistema. Todos os campos são obrigatórios. Requer autenticação.
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmeCreateInput'
 *     responses:
 *       201:
 *         description: Filme criado com sucesso.
 *       400:
 *         description: Erro de validação dos dados enviados.
 *       401:
 *         description: Não autorizado.
 */
router.post('/', authMiddleware, validarCreateFilme, FilmeController.criar);

/**
 * @swagger
 * /api/filmes/{id}:
 *   delete:
 *     summary: Exclui um filme pelo ID
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme excluído com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Filme não encontrado.
 */
router.delete('/:id', authMiddleware, FilmeController.excluir);

// router.get('/', FilmeController.buscar);

// router.get('/:id', FilmeController.buscarFilme);

// router.put('/:id', authMiddleware, validarUpdateFilme, FilmeController.alterar);

// router.post('/', authMiddleware, validarCreateFilme, FilmeController.criar);

// router.delete('/:id', authMiddleware, FilmeController.excluir);

export default router;
