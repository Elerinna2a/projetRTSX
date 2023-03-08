import { Request, Response } from "express";
import { FactureService } from "../services/facture.services";
import { getIdOrVoid } from "../utils";

const factureService = new FactureService();

export class FactureController {
  async getFactures(_req: Request, res: Response) {
    try {
      const factures = await factureService.getFacture();
      res.json(factures);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async getFactureById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const facture = await factureService.getFactureById(id);
        if (facture) {
          res.json(facture);
        } else {
          res.json({ message: "facture not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async createFacture(req: Request, res: Response) {
    try {
      const newFacture = await factureService.createFacture(req.body);
      res.json(newFacture);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async updateFacture(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesFactureExist = await factureService.checkIfFactureExists(id);
        if (doesFactureExist) {
          const updatedFacture = await factureService.updateFacture(
            id,
            req.body
          );
          res.json(updatedFacture);
        } else {
          res.json({ message: "facture not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async deleteFacture(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesFactureExist = await factureService.checkIfFactureExists(id);
        if (doesFactureExist) {
          const deleteFacture = await factureService.deleteFacture(id);
          res.json(deleteFacture);
        } else {
          res.json({ message: "facture not found for this id..." });
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
