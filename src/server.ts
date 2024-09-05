import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente, incluindo DATABASE_URL

import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "https://cronograma-provas-morato-frontend-nja5kwuza.vercel.app/", // Define a URL do frontend
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
