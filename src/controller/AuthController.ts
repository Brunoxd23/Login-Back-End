import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Substitua por uma chave secreta segura

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      if (!JWT_SECRET) {
        return res.status(500).json({ error: 'JWT secret not configured' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

      return res.json({ user, token });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to authenticate' });
    }
  }
}
