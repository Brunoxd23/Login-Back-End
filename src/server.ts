import express from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Configura o middleware CORS para permitir solicitações de diferentes origens
app.use(cors());

// Configura o middleware para analisar o corpo das requisições em JSON
app.use(express.json());

// Usa o roteador importado para gerenciar rotas
app.use(router);

// Obtém a porta a partir das variáveis de ambiente ou usa 3000 por padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor e escuta na porta especificada
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
