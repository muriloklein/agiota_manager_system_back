import express from "express";
import { ClientController } from "../controllers/client";

const controller = new ClientController();
const router = express.Router();

router.post("/client", controller.create);
router.get("/clients", controller.getAll);
router.get("/client/:id", controller.getById);
router.put("/client/:id", controller.update);
router.delete("/client/:id", controller.delete);

export default router;
