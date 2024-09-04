"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UserController_1 = require("./controller/UserController");
const AuthController_1 = require("./controller/AuthController");
const auth_1 = require("./middlewares/auth");
const AgendamentoController_1 = require("./controller/AgendamentoController");
const usercontroller = new UserController_1.UserController();
const authcontroller = new AuthController_1.AuthController();
const agendamentoController = new AgendamentoController_1.AgendamentoController();
exports.router = (0, express_1.Router)();
exports.router.post("/auth", authcontroller.authenticate);
exports.router.post("/create", usercontroller.store);
exports.router.get("/users", auth_1.authMiddleware, usercontroller.index);
// Listar agendamentos
exports.router.get("/agendamentos", agendamentoController.index);
// Criar novo agendamento
exports.router.post("/agendamentos", agendamentoController.store);
// Atualizar agendamento
exports.router.put("/agendamentos/:id", agendamentoController.update);
// Deletar agendamento
exports.router.delete("/agendamentos/:id", agendamentoController.delete);
