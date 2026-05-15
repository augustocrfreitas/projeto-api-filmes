import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.get('/', UserController.listar);

router.post('/login', UserController.login);
router.post('/', UserController.create);

export default router;
