import { Facture } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateFacture, UpdateFacture } from "../types/facture.type";

export class FactureService {
  async getFacture(): Promise<Facture[]> {
    const factures = await prismaClient.facture.findMany();
    return factures;
  }

  async getFactureById(idFacture: number): Promise<Facture | null> {
    const Facture = await prismaClient.facture.findFirst({
      where: { idFacture },
    });
    return Facture;
  }

async createFacture(data: CreateFacture): Promise<{
    status: "SUCCESS" | "ERROR";
    message: string;
    data: Facture | null;
  }> {
    try {
      const newFacture = await prismaClient.facture.create({ data: data });
      return {
        status: "SUCCESS",
        message: "Création réussie !",
        data: newFacture,
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

  async updateFacture(
    idFacture: number,
    data: UpdateFacture
  ): Promise<Facture | null> {
    const updatedUser = await prismaClient.facture.update({
      where: { idFacture },
      data,
    });
    return updatedUser;
  }

  async deleteFacture(idFacture: number): Promise<Facture | null> {
    const deletedUser = await prismaClient.facture.delete({
      where: { idFacture },
    });
    return deletedUser;
  }

  async checkIfFactureExists(idFacture: number): Promise<boolean> {
    return (await prismaClient.facture.findFirst({ where: { idFacture } }))
      ? true
      : false;
  }
}
