import express from 'express';
import cors from 'cors';
import { router } from './routes';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Configurações do CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Permite acesso da URL do frontend
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Roteamento
app.use("/api", router);

// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// Exportar para uso em ambientes serverless
export default app;
