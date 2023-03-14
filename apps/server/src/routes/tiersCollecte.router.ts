import express from "express";
import { TierCollecteController } from "../controllers/tiersCollecte.controller";

export const router = express.Router();

const tierCollecteController = new TierCollecteController();

router.get("/", tierCollecteController.getTiercollectes);
router.get("/:id", tierCollecteController.getTiersCollecteById);

router.post("/", tierCollecteController.createTiersCollecte);

router.put("/:id", tierCollecteController.updateTiersCollecte);

router.delete("/:id", tierCollecteController.deleteTiersCollecte);
