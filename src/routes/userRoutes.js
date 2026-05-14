import UserController from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.get('/', UserController.listar);
router.post('/login', UserController.login);

router.post('/', UserController.create);

export default router;
