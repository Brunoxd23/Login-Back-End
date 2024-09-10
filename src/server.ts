import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://cronograma-provas-morato-frontend.vercel.app",
  "http://localhost:3000"
];

const corsOptions: cors.CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
