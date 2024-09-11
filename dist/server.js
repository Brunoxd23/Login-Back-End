"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
console.log("Iniciando servidor...");
dotenv_1.default.config();
console.log("Variáveis de ambiente carregadas");
const app = (0, express_1.default)();
console.log("Instância do Express criada");
// Log das variáveis de ambiente (não logue informações sensíveis em produção)
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);
console.log("PORT:", process.env.PORT);
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
console.log("CORS configurado");
app.use(express_1.default.json());
console.log("Middleware express.json configurado");
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
app.use(routes_1.router);
console.log("Rotas configuradas");
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}
else {
    console.log("Configuração de produção: servidor pronto para lidar com requisições");
}
exports.default = app;
