// types.d.ts
import { User as PrismaUser } from '@prisma/client';

export interface UserWithRole extends PrismaUser {
  role: string; // Adicione a propriedade 'role' aqui
}
