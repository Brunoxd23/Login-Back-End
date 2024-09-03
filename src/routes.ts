import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { authMiddleware } from "./middlewares/auth";
import { AgendamentoController } from "./controller/AgendamentoController";

const usercontroller = new UserController();
const authcontroller = new AuthController();
const agendamentoController = new AgendamentoController();

export const router = Router();

router.post("/auth", authcontroller.authenticate);
router.post("/create", usercontroller.store);
router.get("/users", authMiddleware, usercontroller.index);

// Listar agendamentos
router.get("/agendamentos", agendamentoController.index);

// Criar novo agendamento
router.post("/agendamentos", agendamentoController.store);

// Atualizar agendamento
router.put("/agendamentos/:id", agendamentoController.update);

// Deletar agendamento
router.delete("/agendamentos/:id", agendamentoController.delete);
