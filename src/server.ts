import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandle';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://cronograma-provas-morato-frontend.vercel.app',
  'https://cronograma-provas-morato-frontend-aa56cstb7.vercel.app',
  'http://localhost:3000'
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    console.log('Requisição CORS recebida de origem:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Habilita envio de cookies e credenciais
  optionsSuccessStatus: 200 // Para lidar com navegadores que tratam 204 como erro
};

// O CORS deve vir ANTES de qualquer rota
app.use(cors(corsOptions));
app.use(express.json());

// Middleware de log (opcional)
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Suas rotas
app.use('/api', router);

// Rota de teste
app.get('/', (_req, res) => {
  res.json({ message: 'Backend is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
