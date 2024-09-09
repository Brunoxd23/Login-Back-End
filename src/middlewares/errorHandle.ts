// middlewares/errorHandle.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro:', err.message);

  // Verifica o tipo de erro e define um status apropriado
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Dados inválidos fornecidos' });
  }

  // Adiciona outras verificações conforme necessário
  res.status(500).json({ message: 'Erro interno do servidor' });
};
