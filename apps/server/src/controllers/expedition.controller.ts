import { Request, Response } from "express";
import { ExpeditionService } from "../services/expedition.services";
import { getIdOrVoid } from "../utils";

const expeditionService = new ExpeditionService();

export class ExpeditionController {
  async getExpeditions(_req: Request, res: Response) {
    try {
      const expeditions = await expeditionService.getExpedition();
      res.json(expeditions);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async getExpeditionById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const expedition = await expeditionService.getExpeditionById(id);
        if (expedition) {
          res.json(expedition);
        } else {
          res.json({ message: "expedition not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async createExpedition(req: Request, res: Response) {
    try {
      const newExpedition = await expeditionService.createExpedition(req.body);
      res.json(newExpedition);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async updateExpedition(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesExpeditionExist =
          await expeditionService.checkIfExpeditionExists(id);
        if (doesExpeditionExist) {
          const updatedExpedition = await expeditionService.updateExpedition(
            id,
            req.body
          );
          res.json(updatedExpedition);
        } else {
          res.json({ message: "expedition not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async deleteExpedition(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesExpeditionExist =
          await expeditionService.checkIfExpeditionExists(id);
        if (doesExpeditionExist) {
          const deletEexpedition = await expeditionService.deleteExpedition(id);
          res.json(deletEexpedition);
        } else {
          res.json({ message: "expedition not found for this id..." });
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
