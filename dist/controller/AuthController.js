"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthController {
    async authenticate(req, res) {
        try {
            const { email, password } = req.body;
            const user = await prisma_1.prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const isPasswordValid = await (0, bcryptjs_1.compare)(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }
            const token = (0, jsonwebtoken_1.sign)({ id: user.id }, process.env.JWT_SECRET || "secret", {
                expiresIn: "1d"
            });
            const { id } = user;
            return res.json({ user: { id, email }, token });
        }
        catch (error) {
            console.error("Authentication error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.AuthController = AuthController;
