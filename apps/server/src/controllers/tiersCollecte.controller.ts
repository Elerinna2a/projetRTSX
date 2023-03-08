import { Request, Response } from "express";
import { TiersCollecteService } from "../services/tiersCollecte.services";
import { getIdOrVoid } from "../utils";
const tierCollecteService = new TiersCollecteService();

export class TierCollecteController {
  async getTiercollectes(req: Request, res: Response) {
    try {
      const tierCollectes = await tierCollecteService.getTierCollectes();
      res.json(tierCollectes);
    } catch (err) {
      console.log("error on getting Tiercollectes");
    }
  }

  async getTiersCollecteById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const tierCollectes = await tierCollecteService.getTierCollectesById(
          id
        );
        if (tierCollectes) {
          res.json(tierCollectes);
        } else {
          res.json({ message: "client not found for this id" });
        }
      } catch (err) {
        console.log("error on getting client by his id");
      }
    }
  }

  async createTiersCollecte(req: Request, res: Response) {
    try {
      const newTiersCollecte = await tierCollecteService.createTierCollectes(
        req.body
      );
      res.json(newTiersCollecte);
    } catch (error: unknown) {
      console.log("error on creating client");
    }
  }

  async updateTiersCollecte(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesTiersCollecteExist =
          await tierCollecteService.checkIfTierCollectesExists(id);
        if (doesTiersCollecteExist) {
          const updatedTiersCollecte =
            await tierCollecteService.updateTierCollectes(id, req.body);
          res.json(updatedTiersCollecte);
        } else {
          res.json({ message: "TiersCollecte not found for this id..." });
        }
      } catch (error: unknown) {
        console.log("error on updating TiersCollecte");
      }
    }
  }

  async deleteTiersCollecte(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesTiersCollecteExist =
          await tierCollecteService.checkIfTierCollectesExists(id);
        if (doesTiersCollecteExist) {
          const deleteTiersCollecte =
            await tierCollecteService.deleteTierCollectes(id);
          res.json(deleteTiersCollecte);
        } else {
          res.json({ message: "TiersCollecte not found for this id..." });
        }
      } catch (error: unknown) {
        console.log("error on deleting TiersCollecte");
      }
    }
  }
}
