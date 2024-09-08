import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './middlewares/auth';

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Permite chamadas sem origem (ex. Postman)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rotas
app.use('/api/auth', authRoutes); // Certifique-se de que a rota está correta

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando!');
});

// Tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});
