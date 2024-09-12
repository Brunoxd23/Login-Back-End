import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = sign({ id: user.id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1d"
      });

      const { id } = user;

      return res.json({ user: { id, email }, token });
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
