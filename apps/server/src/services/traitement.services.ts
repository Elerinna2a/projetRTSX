import { Traitement } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateTraitement, UpdateTraitement } from "../types/traitement.type";

export class TraitementService {
  async getTraitement(): Promise<Traitement[]> {
    const Traitements = await prismaClient.traitement.findMany();
    return Traitements;
  }

  async getTraitementById(idTraitement: number): Promise<Traitement | null> {
    const Traitement = await prismaClient.traitement.findFirst({
      where: { idTraitement },
    });
    return Traitement;
  }

  async createTraitement(data: CreateTraitement): Promise<Traitement> {
    const newTraitement = await prismaClient.traitement.create({ data: data });
    return newTraitement;
  }

  async updateTraitement(
    idTraitement: number,
    data: UpdateTraitement
  ): Promise<Traitement | null> {
    const updatedTraitement = await prismaClient.traitement.update({
      where: { idTraitement },
      data,
    });
    return updatedTraitement;
  }

  async deleteTraitement(idTraitement: number): Promise<Traitement | null> {
    const deletedTraitement = await prismaClient.traitement.delete({
      where: { idTraitement },
    });
    return deletedTraitement;
  }

  async checkIfTraitementExists(idTraitement: number): Promise<boolean> {
    return (await prismaClient.traitement.findFirst({
      where: { idTraitement },
    }))
      ? true
      : false;
  }
}
