import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    try {
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          role, // Inclua a propriedade `role`
        },
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }
}
