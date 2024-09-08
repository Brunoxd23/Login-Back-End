import { Router } from 'express';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido. Configure esta variável de ambiente.');
}

// Configuração CORS
const allowedOrigins = [
  'https://cronograma-provas-morato-frontend.vercel.app',
  'https://cronograma-provas-morato-frontend-98vb5sr0f.vercel.app',
  // Adicione aqui outras origens permitidas, se necessário
];

router.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Endpoint de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ user, token });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to authenticate' });
  }
});

export default router;