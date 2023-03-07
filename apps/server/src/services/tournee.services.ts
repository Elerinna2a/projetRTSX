import { Tournee } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateTournee, UpdateTournee } from "../types/tournee.type";

export class tourneeService {
  async gettournee(): Promise<Tournee[]> {
    const tournees = await prismaClient.tournee.findMany();
    return tournees;
  }

  async gettourneeById(idTournee: number): Promise<Tournee | null> {
    const tournee = await prismaClient.tournee.findFirst({
      where: { idTournee },
    });
    return tournee;
  }

  async createtournee(data: CreateTournee): Promise<Tournee> {
    const newtournee = await prismaClient.tournee.create({ data: data });
    return newtournee;
  }

  async updatetournee(
    idTournee: number,
    data: UpdateTournee
  ): Promise<Tournee | null> {
    const updatedTournee = await prismaClient.tournee.update({
      where: { idTournee },
      data,
    });
    return updatedTournee;
  }

  async deletetournee(idTournee: number): Promise<Tournee | null> {
    const deletedTournee = await prismaClient.tournee.delete({
      where: { idTournee },
    });
    return deletedTournee;
  }

  async checkIftourneeExists(idTournee: number): Promise<boolean> {
    return (await prismaClient.tournee.findFirst({ where: { idTournee } }))
      ? true
      : false;
  }
}
