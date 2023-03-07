import express from "express";
import { ClientController } from "../controllers/tiersCollecte.controller";

export const router = express.Router();

const clientController = new ClientController();

router.get("/", clientController.getTiercollectes);
router.get("/:id", clientController.getTiersCollecteById);

router.post("/", clientController.createTiersCollecte);

router.put("/:id", clientController.updateTiersCollecte);

router.delete("/", clientController.deleteTiersCollecte);
