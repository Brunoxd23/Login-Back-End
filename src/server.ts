import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());
const corsOptions = {
  origin:
    process.env.CORS_ORIGIN ||
    "https://cronograma-provas-morato-frontend.vercel.app",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.listen(3000, () =>
  console.log("Server is running in http://localhost:3000")
);
// Apenas para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
}

// Exportar o manipulador do Express para uso serverless
export default app;
