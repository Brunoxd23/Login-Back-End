import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Verificar se a variável JWT_SECRET está definida
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return res.status(500).json({ error: "JWT secret not configured" });
      }

      // Gerar o token JWT
      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1d", // Token expira em 1 dia
      });

      return res.json({ user, token });
    } catch (error) {
      return res.status(500).json({ error: "Failed to authenticate" });
    }
  }
}
