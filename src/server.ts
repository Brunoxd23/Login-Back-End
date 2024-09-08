import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { router } from './routes'; // Assumindo que você tenha um arquivo de rotas
import { errorHandler } from './middlewares/errorHandle'; // Middleware de tratamento de erros

dotenv.config();

const app = express();

// Configuração de CORS
const allowedOrigins: string[] = [
  'https://cronograma-provas-morato-frontend.vercel.app',
  'https://cronograma-provas-morato-frontend-aa56cstb7.vercel.app',
  'http://localhost:3000'
];

const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    console.log('Requisição CORS recebida de origem:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido por CORS'));
    }
  },
  credentials: true, // Permite envio de credenciais como cookies ou headers de autenticação
  optionsSuccessStatus: 200
};

// Middleware CORS para lidar com requisições
app.use(cors(corsOptions));

// Middleware para analisar JSON no corpo da requisição
app.use(express.json());

// Middleware para logs
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rota principal
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Backend está funcionando' });
});

// Definindo rotas da API
app.use('/api', router);

// Tratando requisições preflight OPTIONS
app.options('*', cors(corsOptions));

// Middleware para tratamento de erros
app.use(errorHandler);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
