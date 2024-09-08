// custom.d.ts ou types/custom.d.ts
import { UserWithRole } from './@types/types'; // Ajuste o caminho conforme necessário

declare global {
  namespace Express {
    interface Request {
      user?: UserWithRole;
    }
  }
}
