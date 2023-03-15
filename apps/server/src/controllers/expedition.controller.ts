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
    const { status, message, data } = await expeditionService.createExpedition(
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

// const traitement = await prismaClient.traitement.findUnique({
//   where: { id: traitementId },
// });
// const tiersCompacte = await prismaClient.tiersCompacte.findUnique({
//   where: { id: tiersCompacteId },
// });
// const facture = await prismaClient.facture.findUnique({
//   where: { num_expedition: numFacture },
// });

// const newExpedition = await prismaClient.expedition.create({
//   data: {
//     destinataire,
//     nbPalette: parseInt(nbPalette),
//     poidNetTotal: parseInt(poidNetTotal),
//     traitement: {
//       connect: {
//         id: traitement.id,
//       },
//     },
//     tiersCompacte: {
//       connect: {
//         id: tiersCompacte.id,
//       },
//     },
//     facture: {
//       connect: {
//         num_expedition: facture.num_expedition,
//       },
//     },
//   },
// });
