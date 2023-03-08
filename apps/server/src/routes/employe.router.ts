import express from "express";
import { EmployeController } from "../controllers/employe.controller";

export const router = express.Router();

const employeController = new EmployeController();

router.get("/", employeController.getEmployes);
router.get("/:id", employeController.getEmployeById);

router.post("/", employeController.createEmploye);

router.put("/:id", employeController.updateEmploye);

router.delete("/:id", employeController.deleteEmploye);
