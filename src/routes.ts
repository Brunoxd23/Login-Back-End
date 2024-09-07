import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import authMiddleware from "./middlewares/auth";

const userController = new UserController();
const authController = new AuthController();

export const router = Router();

router.post("/auth", (req, res) => authController.authenticate(req, res));
router.post("/create", (req, res) => userController.store(req, res));
router.get("/users", authMiddleware, (req, res) => userController.index(req, res));