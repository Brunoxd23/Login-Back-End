import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userExists = await prisma.user.findUnique({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await hash(password, 8);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  }
}
