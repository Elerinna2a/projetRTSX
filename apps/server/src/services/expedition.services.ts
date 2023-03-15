import { Expedition } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateExpedition, UpdateExpedition } from "../types/expedition.type";

export class ExpeditionService {
  async getExpedition(): Promise<Expedition[]> {
    const expeditions = await prismaClient.expedition.findMany();
    return expeditions;
  }

  async getExpeditionById(idNumBl: number): Promise<Expedition | null> {
    const expedition = await prismaClient.expedition.findFirst({
      where: { idNumBl },
    });
    return expedition;
  }

async createExpedition(data: CreateExpedition): Promise<{
    status: "SUCCESS" | "ERROR";
    message: string;
    data: Expedition | null;
  }> {
    try {
      const newExpedition = await prismaClient.expedition.create({ data: data });
      return {
        status: "SUCCESS",
        message: "Création réussie !",
        data: newExpedition,
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

  async updateExpedition(
    idNumBl: number,
    data: UpdateExpedition
  ): Promise<Expedition | null> {
    const updatedExpedition = await prismaClient.expedition.update({
      where: { idNumBl },
      data,
    });
    return updatedExpedition;
  }

  async deleteExpedition(idNumBl: number): Promise<Expedition | null> {
    const deletedExpedition = await prismaClient.expedition.delete({
      where: { idNumBl },
    });
    return deletedExpedition;
  }

  async checkIfExpeditionExists(idNumBl: number): Promise<boolean> {
    return (await prismaClient.expedition.findFirst({ where: { idNumBl } }))
      ? true
      : false;
  }
}
