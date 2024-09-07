import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { router } from './routes'; // Importe suas rotas aqui

const app = express();
const prisma = new PrismaClient();

// Middleware para lidar com erros do Prisma
const handlePrismaErrors = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.constructor.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({ error: 'Erro na solicitação ao banco de dados' });
  }
  next(error);
};

// Configuração do CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Função para gerar token JWT
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

// Middleware de autenticação
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user;
    next();
  });
};

// Use suas rotas aqui
app.use('/api', router);

// Rota de exemplo protegida
app.get('/api/protected', authenticateToken, (req: Request, res: Response) => {
  res.json({ message: 'Rota protegida', user: (req as any).user });
});

// Rota de exemplo para buscar usuários
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Middleware de tratamento de erros do Prisma
app.use(handlePrismaErrors);

// Middleware para lidar com rotas não encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Apenas para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;