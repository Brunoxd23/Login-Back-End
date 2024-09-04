import express from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// Obter a porta a partir das variáveis de ambiente ou usar 3333 por padrão
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
