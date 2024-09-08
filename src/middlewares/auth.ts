import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UserWithRole } from '../@types/types'; // Ajuste o caminho conforme necessário

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido. Configure esta variável de ambiente.');
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } }) as UserWithRole;

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    req.user = user; // Adiciona a propriedade user ao req
    next();
  } catch (error) {
    console.error('Erro durante a autenticação:', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;
