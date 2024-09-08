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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                if (!name || !email || !password) {
                    return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
                }
                const user = yield prisma.user.create({
                    data: {
                        name,
                        email,
                        password
                    }
                });
                return res.status(201).json(user);
            }
            catch (error) {
                console.error('Erro ao criar usuário:', error);
                return res.status(500).json({ error: 'Erro ao criar usuário' });
            }
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.user.findMany();
                return res.status(200).json(users);
            }
            catch (error) {
                console.error('Erro ao listar usuários:', error);
                return res.status(500).json({ error: 'Erro ao listar usuários' });
            }
        });
    }
}
exports.UserController = UserController;
