"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserController {
<<<<<<< HEAD
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
=======
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
>>>>>>> 17e9711c54038bab4232503f36bb9eaa9c8b350f
        });
        user.password = "";
        return res.json({ user });
    }
}
exports.UserController = UserController;
