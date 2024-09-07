import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../server';

export default async (req: VercelRequest, res: VercelResponse) => {
  await app(req, res);
};