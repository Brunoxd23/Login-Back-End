"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
dotenv_1.default.config();
console.log('Ambiente:', process.env.NODE_ENV);
console.log('DATABASE_URL definida:', !!process.env.DATABASE_URL);
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
console.log("Middleware JSON configurado");
// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});
// Teste de conexão com o banco de dados
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
// Usar as rotas definidas
app.use('/api', routes_1.router);
// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
exports.default = app;
