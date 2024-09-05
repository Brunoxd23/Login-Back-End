import express from 'express';
import cors from 'cors';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Defina as opções do CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "https://cronograma-provas-morato-frontend-98vb5sr0f.vercel.app", // Permite acesso do frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    optionsSuccessStatus: 200
};

// Use o middleware de CORS com as opções definidas
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

export default app;
