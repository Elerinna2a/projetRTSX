import express from "express";
import { CollecteController } from "../controllers/collecte.controller";

export const router = express.Router();

const collecteController = new CollecteController();

router.get(
  "/",
  //   (req, res, next) => checkPermissions(req, res, next, ["CLIENT"]),
  collecteController.getCollectes
);
router.get("/:id", collecteController.getCollecteById);

router.post("/", collecteController.createCollecte);

router.put("/:id", collecteController.updateCollecte);

router.delete("/:id", collecteController.deleteCollecte);
