import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes'; // Supondo que você tenha um arquivo separado para as rotas

dotenv.config();

const app = express();

// Lista de origens permitidas
const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'https://cronograma-provas-morato-frontend.vercel.app' // Substitua pelo seu frontend hospedado na Vercel
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
app.use("/api", router); // Supondo que você tenha rotas definidas no arquivo 'routes'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
