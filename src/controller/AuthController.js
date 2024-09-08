"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log('Tentativa de autenticação:', email);
            try {
                const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
                if (!user) {
                    console.log('Usuário não encontrado:', email);
                    return res.status(400).json({ error: "User not found" });
                }
                const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
                if (!passwordMatch) {
                    console.log('Senha inválida:', email);
                    return res.status(400).json({ error: "Invalid credentials" });
                }
                const jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    console.error('JWT secret não configurado');
                    return res.status(500).json({ error: "JWT secret not configured" });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret, {
                    expiresIn: "1d",
                });
                console.log('Autenticação bem-sucedida:', email);
                return res.json({ user: { id: user.id, email: user.email }, token });
            }
            catch (error) {
                console.error('Erro durante a autenticação:', error);
                return res.status(500).json({ error: "Failed to authenticate" });
            }
        });
    }
}
exports.AuthController = AuthController;
