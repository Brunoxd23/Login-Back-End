import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
  
    try {
      console.log(`Tentativa de criação de usuário para o email: ${email}`);
      
      const userExists = await prisma.user.findUnique({ where: { email } });
  
      if (userExists) {
        console.log(`Usuário já existe para o email: ${email}`);
        return res.status(400).json({ error: "User already exists" });
      }
  
      const hash_password = await hash(password, 8);
  
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash_password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        }
      });
  
      console.log(`Usuário criado com sucesso: ${user.id}`);
      return res.status(201).json({ user });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: 'Failed to create user' });
    }
 }
 }