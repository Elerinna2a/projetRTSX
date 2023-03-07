import { Request, Response } from "express";
import { TourneeService } from "../services/tournee.services";
import { getIdOrVoid } from "../utils";

const tourneeService = new TourneeService();

export class UserController {
  async gettournees(_req: Request, res: Response) {
    try {
      const tournees = await tourneeService.gettournee();
      res.json(tournees);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async gettourneeById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const tournee = await tourneeService.gettourneeById(id);
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

  async createtournee(req: Request, res: Response) {
    try {
      const newtournee = await tourneeService.createtournee(req.body);
      res.json(newtournee);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async updatetournee(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doestourneeExist = await tourneeService.checkIftourneeExists(id);
        if (doestourneeExist) {
          const updatedtournee = await tourneeService.updatetournee(
            id,
            req.body
          );
          res.json(updatedtournee);
        } else {
          res.json({ message: "tournee not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async deletetournee(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doestourneeExist = await tourneeService.checkIftourneeExists(id);
        if (doestourneeExist) {
          const deletetournee = await tourneeService.deletetournee(id);
          res.json(deletetournee);
        } else {
          res.json({ message: "tournee not found for this id..." });
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
