"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserController {
    async index(req, res) {
        const users = await prisma.user.findMany();
        return res.json(users);
    }
    async store(req, res) {
        const { name, email, password } = req.body;
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.json({ error: "user exists" });
        }
        const hash_password = await (0, bcryptjs_1.hash)(password, 8);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash_password
            }
        });
        user.password = "";
        return res.json({ user });
    }
}
exports.UserController = UserController;
