import express from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "https://cronograma-provas-morato-frontend-98vb5sr0f.vercel.app", // Permite acesso da URL do frontend
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// Apenas para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
}

// Exportar para uso serverless
export default app;
