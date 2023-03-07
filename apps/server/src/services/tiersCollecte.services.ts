import { TierCollecte } from "@prisma/client";
import { prismaClient } from "../prisma";
import {
  CreateTierCollecte,
  UpdateTierCollecte,
} from "../types/tiersCollecte.types";

export class TiersCollecteService {
  async getTierCollectes(): Promise<TierCollecte[]> {
    const clients = await prismaClient.tierCollecte.findMany();
    return clients;
  }

  async getTierCollectesById(
    idTierCollecte: number
  ): Promise<TierCollecte | null> {
    const tierCollecte = await prismaClient.tierCollecte.findFirst({
      where: { idTierCollecte },
    });
    return tierCollecte;
  }

  async createTierCollectes(
    data: CreateTierCollecte
  ): Promise<TierCollecte | null> {
    const newClient = await prismaClient.tierCollecte.create({ data: data });
    return newClient;
  }

  async updateTierCollectes(
    idTierCollecte: number,
    data: UpdateTierCollecte
  ): Promise<TierCollecte | null> {
    const updatedClient = await prismaClient.tierCollecte.update({
      where: { idTierCollecte },
      data,
    });
    return updatedClient;
  }

  async deleteTierCollectes(
    idTierCollecte: number
  ): Promise<TierCollecte | null> {
    const deletedClient = await prismaClient.tierCollecte.delete({
      where: { idTierCollecte },
    });
    return deletedClient;
  }

  async checkIfTierCollectesExists(idTierCollecte: number): Promise<boolean> {
    return (await prismaClient.tierCollecte.findFirst({
      where: { idTierCollecte },
    }))
      ? true
      : false;
  }
}
