import express from 'express';
import cors from 'cors';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

export default app;
