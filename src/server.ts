import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes'; // Certifique-se de que o caminho está correto
import { errorHandler } from './middlewares/errorHandle'; // Middleware para tratamento de erros
import { PrismaClient } from '@prisma/client'; // Importa o PrismaClient

dotenv.config();

const app = express();
const prisma = new PrismaClient(); // Instancia o PrismaClient

// Conecta ao banco de dados
prisma.$connect()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Encerra o processo em caso de erro
  });

const allowedOrigins = [
  'https://cronograma-provas-morato-frontend.vercel.app',
  'https://cronograma-provas-morato-frontend-98vb5sr0f.vercel.app',
  'http://localhost:3000'
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Configura o CORS
app.use(express.json()); // Configura o Express para usar JSON

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use('/api', router); // Configura as rotas

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.use(errorHandler); // Middleware para tratamento de erros

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
