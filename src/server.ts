import express from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";

// Carrega variáveis de ambiente do arquivo .env apenas em ambiente de desenvolvimento
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// Usa a porta fornecida pelo ambiente ou 3000 como fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Adicione um endpoint de teste
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});
