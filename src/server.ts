import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './middlewares/auth';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Para analisar JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Para analisar dados URL-encoded
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://cronograma-provas-morato-frontend.vercel.app',
      'https://cronograma-provas-morato-frontend-98vb5sr0f.vercel.app',
    ];
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
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

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
