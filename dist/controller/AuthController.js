"use strict";
<<<<<<< HEAD
=======
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
>>>>>>> 17e9711c54038bab4232503f36bb9eaa9c8b350f
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthController {
<<<<<<< HEAD
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
=======
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                const isPasswordValid = yield (0, bcryptjs_1.compare)(password, user.password);
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
>>>>>>> 17e9711c54038bab4232503f36bb9eaa9c8b350f
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
