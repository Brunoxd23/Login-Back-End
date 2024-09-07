"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateToken = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes_1 = require("./routes"); // Importe suas rotas aqui
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware para lidar com erros do Prisma
const handlePrismaErrors = (error, req, res, next) => {
    if (error.constructor.name === 'PrismaClientKnownRequestError') {
        return res.status(400).json({ error: 'Erro na solicitação ao banco de dados' });
    }
    next(error);
};
// Configuração do CORS
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
// Função para gerar token JWT
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
// Use suas rotas aqui
app.use('/api', routes_1.router);
// Rota de exemplo protegida
app.get('/api/protected', exports.authenticateToken, (req, res) => {
    res.json({ message: 'Rota protegida', user: req.user });
});
// Rota de exemplo para buscar usuários
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});
// Middleware de tratamento de erros do Prisma
app.use(handlePrismaErrors);
// Middleware para lidar com rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});
// Apenas para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
exports.default = app;
