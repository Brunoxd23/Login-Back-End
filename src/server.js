"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes"); // Certifique-se de que este caminho está correto
const errorHandle_1 = require("./middlewares/errorHandle");
const client_1 = require("@prisma/client"); // Importa o PrismaClient
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient(); // Instancia o PrismaClient
// Conecta ao banco de dados
prisma.$connect()
    .then(() => console.log('Conectado ao banco de dados!'))
    .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Encerra o processo em caso de erro
});
const allowedOrigins = [
    'https://cronograma-provas-morato-frontend.vercel.app',
    'https://cronograma-provas-morato-frontend-98vb5sr0f.vercel.app',
    'http://localhost:3000'
];
const corsOptions = {
    origin: function (origin, callback) {
        console.log('Requisição CORS recebida de origem:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            console.log('Origem permitida:', origin);
            callback(null, true);
        }
        else {
            console.log('Origem não permitida:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Middleware para logs
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});
app.use('/api', routes_1.router); // Certifique-se de que o router está configurado corretamente
// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'Backend is running' });
});
app.use(errorHandle_1.errorHandler);
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
exports.default = app;
