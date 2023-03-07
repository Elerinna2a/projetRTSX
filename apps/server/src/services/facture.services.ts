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

  async createFacture(data: CreateFacture): Promise<Facture> {
    const newFacture = await prismaClient.facture.create({ data: data });
    return newFacture;
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
