import express from "express";
import { FactureController } from "../controllers/facture.controller";

export const router = express.Router();

const factureController = new FactureController();

router.get("/", factureController.getFactures);
router.get("/:id", factureController.getFactureById);

router.post("/", factureController.createFacture);

router.put("/:id", factureController.updateFacture);

router.delete("/:id", factureController.deleteFacture);
