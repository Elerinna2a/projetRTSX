import express from "express";
import { ExpeditionController } from "../controllers/expedition.controller";

export const router = express.Router();

const expeditionController = new ExpeditionController();

router.get("/", expeditionController.getExpeditions);
router.get("/:id", expeditionController.getExpeditionById);

router.post("/", expeditionController.createExpedition);

router.put("/:id", expeditionController.updateExpedition);

router.delete("/:id", expeditionController.deleteExpedition);
