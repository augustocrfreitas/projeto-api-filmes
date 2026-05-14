import FilmeController from '../controllers/filmeController.js';
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, FilmeController.buscar);
router.get('/:id', authMiddleware, FilmeController.buscarFilme);

router.put('/:id', authMiddleware, FilmeController.alterar);

router.post('/', authMiddleware, FilmeController.criar);

router.delete('/:id', authMiddleware, FilmeController.excluir);

export default router;
