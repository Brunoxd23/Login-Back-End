"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }
            const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }
            // Verificar se a variável JWT_SECRET está definida
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                return res.status(500).json({ error: "JWT secret not configured" });
            }
            // Gerar o token JWT
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret, {
                expiresIn: "1d", // Token expira em 1 dia
            });
            return res.json({ user, token });
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to authenticate" });
        }
    }
}
exports.AuthController = AuthController;
