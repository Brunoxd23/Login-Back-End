"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('Ambiente:', process.env.NODE_ENV);
console.log('DATABASE_URL definida:', !!process.env.DATABASE_URL);
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', async (req, res) => {
    try {
        await prisma.$connect();
        console.log('Conexão com o banco de dados bem-sucedida');
        res.json({ message: 'Servidor funcionando e conectado ao banco de dados' });
    }
    catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
    }
    finally {
        await prisma.$disconnect();
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
exports.default = app;
