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
exports.UserController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
class UserController {
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Buscando todos os usuários");
                const users = yield prisma_1.prisma.user.findMany({
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                });
                console.log(`${users.length} usuários encontrados`);
                return res.json(users);
            }
            catch (error) {
                console.error("Erro ao buscar usuários:", error);
                return res.status(500).json({ error: 'Failed to fetch users' });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                console.log(`Tentativa de criação de usuário para o email: ${email}`);
                const userExists = yield prisma_1.prisma.user.findUnique({ where: { email } });
                if (userExists) {
                    console.log(`Usuário já existe para o email: ${email}`);
                    return res.status(400).json({ error: "User already exists" });
                }
                const hash_password = yield (0, bcryptjs_1.hash)(password, 8);
                const user = yield prisma_1.prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hash_password,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                });
                console.log(`Usuário criado com sucesso: ${user.id}`);
                return res.status(201).json({ user });
            }
            catch (error) {
                console.error("Erro ao criar usuário:", error);
                return res.status(500).json({ error: 'Failed to create user' });
            }
        });
    }
}
exports.UserController = UserController;
