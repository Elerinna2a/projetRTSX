import express from "express";
import { TraitementController } from "../controllers/traitement.controller";

export const router = express.Router();

const traitementController = new TraitementController();

router.get("/", traitementController.getTraitements);
router.get("/:id", traitementController.gettraitementById);

router.post("/", traitementController.createTraitement);

router.put("/:id", traitementController.updateTraitement);

router.delete("/:id", traitementController.deleteTraitement);
