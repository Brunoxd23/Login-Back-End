import express from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "https://cronograma-provas-morato-frontend.vercel.app/",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

// Apenas para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
}

// Exportar o manipulador do Express para uso serverless
export default app;