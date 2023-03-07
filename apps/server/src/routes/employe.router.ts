import express from "express";
import { UserController } from "../controllers/user.controller";

export const router = express.Router();

const userController = new UserController();

router.get("/", userController.getEmployes);
router.get("/:id", userController.getEmployeById);

router.post("/", userController.createEmploye);

router.put("/:id", userController.updateEmploye);

router.delete("/:id", userController.deleteEmploye);
