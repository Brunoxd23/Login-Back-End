import express from 'express';
import cors from 'cors';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'http://localhost:3000',
  'https://cronograma-provas-morato-frontend.vercel.app',
  'https://cronograma-provas-morato-frontend-98vb5sr0f.vercel.app'
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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Adicione um handler específico para solicitações OPTIONS
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(router);

// Middleware para logging (ajuda na depuração)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  next();
});

const PORT = process.env.PORT || 3000;

// Apenas para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
}

export default app;