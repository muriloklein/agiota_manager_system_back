import express from "express";
import { HealthCheckController } from "../controllers/healthCheck";

const controller = new HealthCheckController();
const router = express.Router();

router.get("/healthCheck", controller.healthCheck);

export default router;
