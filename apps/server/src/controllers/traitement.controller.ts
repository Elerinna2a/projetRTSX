import { Request, Response } from "express";
import { TraitementService } from "../services/traitement.services";
import { getIdOrVoid } from "../utils";

const traitementService = new TraitementService();

export class TraitementController {
  async getTraitements(_req: Request, res: Response) {
    try {
      const traitements = await traitementService.getTraitement();
      res.json(traitements);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async gettraitementById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const traitement = await traitementService.getTraitementById(id);
        if (traitement) {
          res.json(traitement);
        } else {
          res.json({ message: "traitement not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

async createTraitement(req: Request, res: Response) {
    const { status, message, data } = await traitementService.createTraitement(
      req.body
    );

    if (status === "ERROR") {
      res.json({
        status,
        message,
        newClient: null,
      });
    } else {
      res.json({
        status,
        message,
        newClient: data,
      });
    }
  }

  async updateTraitement(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesTraitementExist =
          await traitementService.checkIfTraitementExists(id);
        if (doesTraitementExist) {
          const updatedTraitement = await traitementService.updateTraitement(
            id,
            req.body
          );
          res.json(updatedTraitement);
        } else {
          res.json({ message: "traitement not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async deleteTraitement(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesTraitementExist =
          await traitementService.checkIfTraitementExists(id);
        if (doesTraitementExist) {
          const deleteTraitement = await traitementService.deleteTraitement(id);
          res.json(deleteTraitement);
        } else {
          res.json({ message: "traitement not found for this id..." });
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
