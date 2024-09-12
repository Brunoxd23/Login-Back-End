import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes';

dotenv.config();
console.log('Ambiente:', process.env.NODE_ENV);
console.log('DATABASE_URL definida:', !!process.env.DATABASE_URL);

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Middleware para logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Teste de conexão com o banco de dados
app.get('/', async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados bem-sucedida');
    res.json({ message: 'Servidor funcionando e conectado ao banco de dados' });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
  } finally {
    await prisma.$disconnect();
  }
});

// Usar as rotas definidas
app.use('/api', router);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app;