import express from "express";
import { CollecteController } from "../controllers/collecte.controller";

export const router = express.Router();

const collecteController = new CollecteController();

router.get("/", collecteController.getcollectes);
router.get("/:id", collecteController.getCollecteById);

router.post("/", collecteController.createCollecte);

router.put("/:id", collecteController.updateCollecte);

router.delete("/:id", collecteController.deleteCollecte);
