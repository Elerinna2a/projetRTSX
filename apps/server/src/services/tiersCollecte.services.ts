import { TierCollecte } from "@prisma/client";
import { prismaClient } from "../prisma";
import {
  CreateTierCollecte,
  UpdateTierCollecte
} from "../types/tiersCollecte.types";

export class TiersCollecteService {
  async getTierCollectes(): Promise<TierCollecte[]> {
    const tierCollectes = await prismaClient.tierCollecte.findMany();
    return tierCollectes;
  }

  async getTierCollectesById(
    idTierCollecte: number
  ): Promise<TierCollecte | null> {
    const tierCollecte = await prismaClient.tierCollecte.findFirst({
      where: { idTierCollecte },
    });
    return tierCollecte;
  }

async createTierCollecte(data: CreateTierCollecte): Promise<{
    status: "SUCCESS" | "ERROR";
    message: string;
    data: TierCollecte | null;
  }> {
    try {
      const newTierCollecte = await prismaClient.tierCollecte.create({ data: data });
      return {
        status: "SUCCESS",
        message: "Création réussie !",
        data: newTierCollecte,
      };
    } catch (error) {
      console.log(error);

      return {
        status: "ERROR",
        message: "Problème lors de la création du tier collecté...",
        data: null,
      };
    }
  }

  async updateTierCollectes(
    idTierCollecte: number,
    data: UpdateTierCollecte
  ): Promise<TierCollecte | null> {
    const updatedTierCollecte = await prismaClient.tierCollecte.update({
      where: { idTierCollecte },
      data,
    });
    return updatedTierCollecte;
  }

  async deleteTierCollectes(
    idTierCollecte: number
  ): Promise<TierCollecte | null> {
    const deletedTierCollecte = await prismaClient.tierCollecte.delete({
      where: { idTierCollecte },
    });
    return deletedTierCollecte;
  }

  async checkIfTierCollectesExists(idTierCollecte: number): Promise<boolean> {
    return (await prismaClient.tierCollecte.findFirst({
      where: { idTierCollecte },
    }))
      ? true
      : false;
  }
}
