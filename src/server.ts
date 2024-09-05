import express from 'express';
import cors from 'cors';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Defina as opções de CORS para permitir o frontend acessar o backend
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Usa a variável de ambiente CORS_ORIGIN
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    optionsSuccessStatus: 200
};

// Aplique o middleware de CORS
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
