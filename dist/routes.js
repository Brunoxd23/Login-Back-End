"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UserController_1 = require("./controller/UserController");
const AuthController_1 = require("./controller/AuthController");
const auth_1 = __importDefault(require("./middlewares/auth"));
const usercontroller = new UserController_1.UserController();
const authcontroller = new AuthController_1.AuthController();
exports.router = (0, express_1.Router)();
exports.router.post("/auth", authcontroller.authenticate);
exports.router.post("/create", usercontroller.store);
exports.router.get("/users", auth_1.default, usercontroller.index);
