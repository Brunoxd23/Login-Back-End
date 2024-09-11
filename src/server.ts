import express from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";

console.log("Iniciando servidor...");

dotenv.config();
console.log("Variáveis de ambiente carregadas");

const app = express();
console.log("Instância do Express criada");

// Log das variáveis de ambiente (não logue informações sensíveis em produção)
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);
console.log("PORT:", process.env.PORT);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);
console.log("CORS configurado");

app.use(express.json());
console.log("Middleware express.json configurado");

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(router);
console.log("Rotas configuradas");

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
} else {
  console.log(
    "Configuração de produção: servidor pronto para lidar com requisições"
  );
}

export default app;
