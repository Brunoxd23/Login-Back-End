import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes'; // Certifique-se de que este caminho está correto
import { errorHandler } from './middlewares/errorHandle';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://cronograma-provas-morato-frontend.vercel.app',
  'https://cronograma-provas-morato-frontend-98vb5sr0f.vercel.app',
  'http://localhost:3000'
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    console.log('Requisição CORS recebida de origem:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      console.log('Origem permitida:', origin);
      callback(null, true);
    } else {
      console.log('Origem não permitida:', origin);
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

app.use('/api', router); // Certifique-se de que o router está configurado corretamente

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
}

export default app;
