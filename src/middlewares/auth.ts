import { Router } from 'express';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UserWithRole } from '../@types/types'; // Ajuste o caminho conforme necessário

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido. Configure esta variável de ambiente.');
}

// Endpoint de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Recebido email:', email);
  console.log('Recebido senha:', password);

  try {
    const user = await prisma.user.findUnique({ where: { email } }) as UserWithRole;

    console.log('Usuário encontrado:', user);

    if (!user || !(await compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Senha verificada, gerando token');

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Token gerado:', token);

    return res.json({ user, token });
  } catch (error) {
    console.error('Erro durante a autenticação:', error);
    return res.status(500).json({ error: 'Failed to authenticate' });
  }
});

export default router;
