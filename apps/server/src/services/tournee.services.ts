import { Tournee } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateTournee, UpdateTournee } from "../types/tournee.type";

export class TourneeService {
  async getTournee(): Promise<Tournee[]> {
    const tournees = await prismaClient.tournee.findMany();
    return tournees;
  }

  async getTourneeById(idTournee: number): Promise<Tournee | null> {
    const tournee = await prismaClient.tournee.findFirst({
      where: { idTournee },
    });
    return tournee;
  }

async createTournee(data: CreateTournee): Promise<{
    status: "SUCCESS" | "ERROR";
    message: string;
    data: Tournee | null;
  }> {
    try {
      const newTournee = await prismaClient.tournee.create({ data: data });
      return {
        status: "SUCCESS",
        message: "Création réussie !",
        data: newTournee,
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

  async updateTournee(
    idTournee: number,
    data: UpdateTournee
  ): Promise<Tournee | null> {
    const updatedTournee = await prismaClient.tournee.update({
      where: { idTournee },
      data,
    });
    return updatedTournee;
  }

  async deleteTournee(idTournee: number): Promise<Tournee | null> {
    const deletedTournee = await prismaClient.tournee.delete({
      where: { idTournee },
    });
    return deletedTournee;
  }

  async checkIfTourneeExists(idTournee: number): Promise<boolean> {
    return (await prismaClient.tournee.findFirst({ where: { idTournee } }))
      ? true
      : false;
  }
}
