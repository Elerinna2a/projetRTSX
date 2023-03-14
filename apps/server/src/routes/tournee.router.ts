import express from "express";
import { TourneeController } from "../controllers/tournee.controllers";

export const router = express.Router();

const tourneeController = new TourneeController();

router.get("/", tourneeController.getTournees);
router.get("/:id", tourneeController.getTourneeById);

router.post("/", tourneeController.createTournee);

router.put("/:id", tourneeController.updateTournee);

router.delete("/:id", tourneeController.deleteTournee);
