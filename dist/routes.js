"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var UserController_1 = require("./controller/UserController");
var AuthController_1 = require("./controller/AuthController");
var auth_1 = require("./middlewares/auth");
var AgendamentoController_1 = require("./controller/AgendamentoController");
var usercontroller = new UserController_1.UserController();
var authcontroller = new AuthController_1.AuthController();
var agendamentoController = new AgendamentoController_1.AgendamentoController();
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
exports.router["delete"]("/agendamentos/:id", agendamentoController["delete"]);
