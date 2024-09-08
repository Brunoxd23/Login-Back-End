import { Router } from 'express';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import authMiddleware from './middlewares/auth';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

// Endpoint para autenticação
router.post('/auth/login', (req, res) => authController.authenticate(req, res));

// Endpoint para criar um novo usuário
router.post('/create', (req, res) => userController.store(req, res));

// Endpoint protegido para listar usuários
router.get('/users', authMiddleware, (req, res) => userController.index(req, res));

export { router };
