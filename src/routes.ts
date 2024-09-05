import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { authMiddleware } from "./middlewares/auth";

const userController = new UserController();
const authController = new AuthController();

export const router = Router();

router.post("/auth", authController.authenticate);
router.post("/create", userController.store);
router.get("/users", authMiddleware, userController.index);
