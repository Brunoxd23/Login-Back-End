"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
<<<<<<< HEAD
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
=======
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
console.log("Iniciando servidor...");
dotenv_1.default.config();
console.log("Variáveis de ambiente:", process.env);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
console.log("CORS configurado");
app.use(express_1.default.json());
console.log("Middleware JSON configurado");
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    next();
});
const errorHandler = (err, req, res, next) => {
    console.error("Erro não tratado:", err);
    res
        .status(500)
        .json({ error: "Erro interno do servidor", details: err.message });
};
app.use(errorHandler);
app.use(routes_1.router);
console.log("Rotas configuradas");
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
>>>>>>> 17e9711c54038bab4232503f36bb9eaa9c8b350f
exports.default = app;
