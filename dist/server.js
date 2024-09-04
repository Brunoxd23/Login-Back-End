"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega variáveis de ambiente do arquivo .env
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configura o middleware CORS para permitir solicitações de diferentes origens
app.use((0, cors_1.default)());
// Configura o middleware para analisar o corpo das requisições em JSON
app.use(express_1.default.json());
// Usa o roteador importado para gerenciar rotas
app.use(routes_1.router);
// Obtém a porta a partir das variáveis de ambiente ou usa 3000 por padrão
const PORT = process.env.PORT || 3000;
// Inicia o servidor e escuta na porta especificada
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
