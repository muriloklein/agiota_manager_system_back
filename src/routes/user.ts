import express from "express";
import { UserController } from "../controllers/user";

const controller = new UserController();
const router = express.Router();

router.post("/login", controller.login);
router.post("/register", controller.create);

export default router;
