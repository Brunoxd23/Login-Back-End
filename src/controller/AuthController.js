"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.json({ error: "user not found" });
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isPasswordValid) {
            return res.json({ error: "password invalid" });
        }
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, "secret", { expiresIn: "1h" });
        const { id } = user;
        return res.json({ user: { id, email }, token });
    }
}
exports.AuthController = AuthController;
