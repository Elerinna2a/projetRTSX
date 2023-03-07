import { Request, Response } from "express";
import { EmployeService } from "../services/employe.services";
import { getIdOrVoid } from "../utils";

const employeService = new EmployeService();

export class UserController {
  async getEmployes(_req: Request, res: Response) {
    try {
      const employes = await employeService.getEmploye();
      res.json(employes);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async getEmployeById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const employe = await employeService.getEmployeById(id);
        if (employe) {
          res.json(employe);
        } else {
          res.json({ message: "employe not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async createEmploye(req: Request, res: Response) {
    try {
      const newEmploye = await employeService.createEmploye(req.body);
      res.json(newEmploye);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async updateEmploye(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesEmployeExist = await employeService.checkIfEmployeExists(id);
        if (doesEmployeExist) {
          const updatedEmploye = await employeService.updateEmploye(
            id,
            req.body
          );
          res.json(updatedEmploye);
        } else {
          res.json({ message: "Employe not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async deleteEmploye(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesEmployeExist = await employeService.checkIfEmployeExists(id);
        if (doesEmployeExist) {
          const deleteEmploye = await employeService.deleteEmploye(id);
          res.json(deleteEmploye);
        } else {
          res.json({ message: "Employe not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  // async toggleStatus(req: Request, res: Response) {
  //   const id = getIdOrVoid(req.params.id, res);
  //   if (id) {
  //     try {
  //       const user = await userService.getUserById(id);
  //       if (user) {
  //         const updatedUser = await userService.toggleStatus(id, user.isAdmin);
  //         res.json(updatedUser);
  //       } else {
  //         res.json({ message: "User not found for this id..." });
  //       }
  //     } catch (error: unknown) {
  //       console.log(error, res);
  //     }
  //   }
  // }
}
