import express from "express";
import { ClientController } from "../controllers/client.controller";

export const router = express.Router();

const clientController = new ClientController();

router.get("/", clientController.getClients);
router.get("/:id", clientController.getclientById);

router.post("/", clientController.createClient);

router.put("/:id", clientController.updateClient);

router.delete("/", clientController.deleteClient);
