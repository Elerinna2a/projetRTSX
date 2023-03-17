import { Collecte } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateCollecte, UpdateCollecte } from "../types/collecte.type";

export class CollecteService {
  async getCollectes(): Promise<Collecte[]> {
    const Collectes = await prismaClient.collecte.findMany();
    return Collectes;
  }

  async getCollecteById(idNumLot: number): Promise<Collecte | null> {
    const Collecte = await prismaClient.collecte.findFirst({
      where: { idNumLot },
    });
    return Collecte;
  }

  async createCollecte(data: CreateCollecte): Promise<{
    status: "SUCCESS" | "ERROR";
    message: string;
    data: Collecte | null;
  }> {
    try {
      const newCollecte = await prismaClient.collecte.create({ data: data });
      return {
        status: "SUCCESS",
        message: "Création réussie !",
        data: newCollecte,
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

  async updateCollecte(
    idNumLot: number,
    data: UpdateCollecte
  ): Promise<Collecte | null> {
    const updatedUser = await prismaClient.collecte.update({
      where: { idNumLot },
      data,
    });
    return updatedUser;
  }

  async deleteCollecte(idNumLot: number): Promise<Collecte | null> {
    const deletedUser = await prismaClient.collecte.delete({
      where: { idNumLot },
    });
    return deletedUser;
  }

  async checkIfCollecteExists(idNumLot: number): Promise<boolean> {
    return (await prismaClient.collecte.findFirst({ where: { idNumLot } }))
      ? true
      : false;
  }
}
