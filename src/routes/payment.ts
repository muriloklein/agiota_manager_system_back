import express from "express";
import { PaymentController } from "../controllers/payment";

const controller = new PaymentController();
const router = express.Router();

router.post("payment", controller.create);
router.get("payments", controller.getAll);
router.get("payment/:id", controller.getById);
router.put("payment/:id", controller.update);
router.delete("payment/:id", controller.delete);

export default router;
