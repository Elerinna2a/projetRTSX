import { Request, Response } from "express";
import { TourneeService } from "../services/tournee.services";
import { getIdOrVoid } from "../utils";

const tourneeService = new TourneeService();

export class TourneeController {
  async getTournees(_req: Request, res: Response) {
    try {
      const tournees = await tourneeService.getTournee();
      res.json(tournees);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async getTourneeById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const tournee = await tourneeService.getTourneeById(id);
        if (tournee) {
          res.json(tournee);
        } else {
          res.json({ message: "tournee not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async createTournee(req: Request, res: Response) {
    const { status, message, data } = await tourneeService.createTournee(
      req.body
    );
    if (status === "ERROR") {
      res.json({
        status,
        message,
        newClient: null,
      });
      console.log(message);
    } else {
      res.json({
        status,
        message,
        newClient: data,
      });
    }
  }

  async updateTournee(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesTourneeExist = await tourneeService.checkIfTourneeExists(id);
        if (doesTourneeExist) {
          const updatedTournee = await tourneeService.updateTournee(
            id,
            req.body
          );
          res.json(updatedTournee);
        } else {
          res.json({ message: "tournee not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async deleteTournee(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    console.log(req.params.id);

    if (id) {
      try {
        console.log("titi");
        const doesTourneeExist = await tourneeService.checkIfTourneeExists(id);
        if (doesTourneeExist) {
          console.log("ezpz");
          const deleteTournee = await tourneeService.deleteTournee(id);
          res.json(deleteTournee);
        } else {
          res.json({ message: "tournee not found for this id..." });
        }
      } catch (error: unknown) {
        console.log("tutu");
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
