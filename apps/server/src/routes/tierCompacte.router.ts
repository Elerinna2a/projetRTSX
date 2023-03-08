import express from "express";
import { TiersCompacteController } from "../controllers/tiersCompacte.controller";

export const router = express.Router();

const tierCompacteController = new TiersCompacteController();

router.get("/", tierCompacteController.getTierCompactes);
router.get("/:id", tierCompacteController.getTiersCompacteById);

router.post("/", tierCompacteController.createTiersCompacte);

router.put("/:id", tierCompacteController.updateTiersCompacte);

router.delete("/:id", tierCompacteController.deleteTiersCompacte);
