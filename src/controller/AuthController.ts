import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      console.log(`Tentativa de autenticação para o email: ${email}`);
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        console.log(`Usuário não encontrado para o email: ${email}`);
        return res.status(400).json({ error: "User not found" });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        console.log(`Senha inválida para o usuário: ${email}`);
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        console.error("JWT secret não configurado");
        return res.status(500).json({ error: "JWT secret not configured" });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1d",
      });

      console.log(`Autenticação bem-sucedida para o usuário: ${email}`);
      return res.json({ user: { id: user.id, email: user.email }, token });
    } catch (error) {
      console.error("Erro durante a autenticação:", error);
      return res.status(500).json({ error: "Failed to authenticate" });
    }
  }
}