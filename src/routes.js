"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UserController_1 = require("./controller/UserController");
const AuthController_1 = require("./controller/AuthController");
const auth_1 = __importDefault(require("./middlewares/auth"));
const router = (0, express_1.Router)();
exports.router = router;
const userController = new UserController_1.UserController();
const authController = new AuthController_1.AuthController();
// Endpoint para autenticação
router.post('/auth/login', (req, res) => authController.authenticate(req, res));
// Endpoint para criar um novo usuário
router.post('/create', (req, res) => userController.store(req, res));
// Endpoint protegido para listar usuários
router.get('/users', auth_1.default, (req, res) => userController.index(req, res));
