import { Request, Response } from "express";
import { CollecteService } from "../services/collecte.services";
import { getIdOrVoid } from "../utils";

const collecteService = new CollecteService();

export class CollecteController {
  async getcollectes(_req: Request, res: Response) {
    try {
      const collectes = await collecteService.getCollectes();
      res.json(collectes);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async getCollecteById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const collecte = await collecteService.getCollecteById(id);
        if (collecte) {
          res.json(collecte);
        } else {
          res.json({ message: "collecte not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async createCollecte(req: Request, res: Response) {
    try {
      const newCollecte = await collecteService.createCollecte(req.body);
      res.json(newCollecte);
    } catch (error: unknown) {
      console.log(error, res);
    }
  }

  async updateCollecte(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesCollecteExist = await collecteService.checkIfCollecteExists(
          id
        );
        if (doesCollecteExist) {
          const updatedCollecte = await collecteService.updateCollecte(
            id,
            req.body
          );
          res.json(updatedCollecte);
        } else {
          res.json({ message: "collecte not found for this id..." });
        }
      } catch (error: unknown) {
        console.log(error, res);
      }
    }
  }

  async deleteCollecte(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesCollecteExist = await collecteService.checkIfCollecteExists(
          id
        );
        if (doesCollecteExist) {
          const deletecollecte = await collecteService.deleteCollecte(id);
          res.json(deletecollecte);
        } else {
          res.json({ message: "collecte not found for this id..." });
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
