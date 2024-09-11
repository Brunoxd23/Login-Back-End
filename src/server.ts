import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler
} from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";

console.log("Iniciando servidor...");

dotenv.config();
console.log("Variáveis de ambiente:", process.env);

const app = express();

app.use(cors());
console.log("CORS configurado");

app.use(express.json());
console.log("Middleware JSON configurado");

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res
    .status(500)
    .json({ error: "Erro interno do servidor", details: err.message });
};

app.use(errorHandler);

app.use(router);
console.log("Rotas configuradas");

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

export default app;
