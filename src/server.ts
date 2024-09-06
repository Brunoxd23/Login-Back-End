import express from 'express';
import cors from 'cors';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'https://cronograma-provas-morato-frontend.vercel.app'
  // Adicione aqui outras origens permitidas, se necessário
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
  console.log(`Server is running on http://localhost:${PORT}`)
);

export default app;
