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
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany();
            return res.json(users);
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const userExists = yield prisma.user.findUnique({ where: { email } });
            if (userExists) {
                return res.json({ error: "user exists" });
            }
            const hash_password = yield (0, bcryptjs_1.hash)(password, 8);
            const user = yield prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash_password
                }
            });
            user.password = "";
            return res.json({ user });
        });
    }
}
exports.UserController = UserController;
