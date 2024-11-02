import express from "express";
import { UserController } from "../controllers/user";

const controller = new UserController();
const router = express.Router();

router.post("user", controller.create);
router.get("users", controller.getAll);
router.get("user/:id", controller.getById);
router.put("user/:id", controller.update);
router.delete("user/:id", controller.delete);

export default router;
