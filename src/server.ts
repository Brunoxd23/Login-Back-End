import express from 'express';
import cors from 'cors';
import { router } from './routes';
import dotenv from 'dotenv';

console.log("Iniciando configuração do servidor...");

dotenv.config();
console.log("Variáveis de ambiente carregadas");

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "https://frontend-pied-kappa-64.vercel.app",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
console.log("CORS configurado");

app.use(express.json());
console.log("Middleware JSON configurado");

app.use("/api", router);
console.log("Rotas configuradas");

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error("Erro não tratado:", err);
    res.status(500).json({ error: "Erro interno do servidor", details: err.message });
});

// Apenas para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}

console.log("Configuração do servidor concluída");

export default app;
