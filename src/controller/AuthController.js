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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthController {
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.json({ error: "user not found" });
            }
            const isPasswordValid = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!isPasswordValid) {
                return res.json({ error: "password invalid" });
            }
            const token = (0, jsonwebtoken_1.sign)({ id: user.id }, "secret", { expiresIn: "1h" });
            const { id } = user;
            return res.json({ user: { id, email }, token });
        });
    }
}
exports.AuthController = AuthController;
