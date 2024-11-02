import express from "express";
import { BillController } from "../controllers/bill";

const controller = new BillController();
const router = express.Router();

router.post("bill", controller.create);
router.get("bills", controller.getAll);
router.get("bill/:id", controller.getById);
router.put("bill/:id", controller.update);
router.delete("bill/:id", controller.delete);

export default router;
