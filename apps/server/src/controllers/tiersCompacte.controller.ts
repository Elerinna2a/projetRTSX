import { Request, Response } from "express";
import { TiersCompacteService } from "../services/tierCompacte.services";
import { getIdOrVoid } from "../utils";

const tierCompacteService = new TiersCompacteService();

export class TiersCompacteController {
  async getTierCompactes(req: Request, res: Response) {
    try {
      const tierCompactes = await tierCompacteService.getTiersCompacte();
      res.json(tierCompactes);
    } catch (err) {
      console.log("error on getting TierCompactes");
    }
  }

  async getTiersCompacteById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const tierCompactes = await tierCompacteService.getTiersCompacteById(
          id
        );
        if (tierCompactes) {
          res.json(tierCompactes);
        } else {
          res.json({ message: "client not found for this id" });
        }
      } catch (err) {
        console.log("error on getting client by his id");
      }
    }
  }

async createTierCompacte(req: Request, res: Response) {
    const { status, message, data } = await tierCompacteService.createTierCompacte(
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

  async updateTiersCompacte(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesTiersCompacteExist =
          await tierCompacteService.checkIfTiersCompacteExists(id);
        if (doesTiersCompacteExist) {
          const updatedTiersCompacte =
            await tierCompacteService.updateTiersCompacte(id, req.body);
          res.json(updatedTiersCompacte);
        } else {
          res.json({ message: "TiersCompacte not found for this id..." });
        }
      } catch (error: unknown) {
        console.log("error on updating TiersCompacte");
      }
    }
  }

  async deleteTiersCompacte(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesTiersCompacteExist =
          await tierCompacteService.checkIfTiersCompacteExists(id);
        if (doesTiersCompacteExist) {
          const deleteTiersCompacte =
            await tierCompacteService.deleteTiersCompacte(id);
          res.json(deleteTiersCompacte);
        } else {
          res.json({ message: "TiersCompacte not found for this id..." });
        }
      } catch (error: unknown) {
        console.log("error on deleting TiersCompacte");
      }
    }
  }
}
