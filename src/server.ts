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
  'http://localhost:3000' // Adicione outras origens permitidas, se necessário
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use('/api', router);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  // Código específico para ambiente de produção, se necessário
  app.listen(PORT, () => {
    console.log(`Server is running on production environment on port ${PORT}`);
  });
}

export default app;
