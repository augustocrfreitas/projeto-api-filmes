import FilmeController from '../controllers/filmeController.js';
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validarCreateFilme, validarUpdateFilme } from '../middlewares/filmeMiddleware.js';

const router = express.Router();

router.get('/', FilmeController.buscar);
router.get('/:id', FilmeController.buscarFilme);
router.put('/:id', authMiddleware, validarUpdateFilme, FilmeController.alterar);
router.post('/', authMiddleware, validarCreateFilme, FilmeController.criar);
router.delete('/:id', authMiddleware, FilmeController.excluir);

export default router;
