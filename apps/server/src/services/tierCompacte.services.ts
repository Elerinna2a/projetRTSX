import { TiersCompacte } from "@prisma/client";
import { prismaClient } from "../prisma";
import {
  CreateTiersCompacte,
  UpdateTiersCompacte,
} from "../types/tiersCompacte.type";

export class TiersCompacteService {
  async getTiersCompacte(): Promise<TiersCompacte[]> {
    const tiersCompactes = await prismaClient.tiersCompacte.findMany();
    return tiersCompactes;
  }

  async getTiersCompacteById(
    idTiersCompacte: number
  ): Promise<TiersCompacte | null> {
    const tiersCompacte = await prismaClient.tiersCompacte.findFirst({
      where: { idTiersCompacte },
    });
    return tiersCompacte;
  }

  async createTiersCompacte(data: CreateTiersCompacte): Promise<TiersCompacte> {
    const newTiersCompacte = await prismaClient.tiersCompacte.create({
      data: data,
    });
    return newTiersCompacte;
  }

  async updateTiersCompacte(
    idTiersCompacte: number,
    data: UpdateTiersCompacte
  ): Promise<TiersCompacte | null> {
    const updatedUser = await prismaClient.tiersCompacte.update({
      where: { idTiersCompacte },
      data,
    });
    return updatedUser;
  }

  async deleteTiersCompacte(
    idTiersCompacte: number
  ): Promise<TiersCompacte | null> {
    const deletedUser = await prismaClient.tiersCompacte.delete({
      where: { idTiersCompacte },
    });
    return deletedUser;
  }

  async checkIfTiersCompacteExists(idTiersCompacte: number): Promise<boolean> {
    return (await prismaClient.tiersCompacte.findFirst({
      where: { idTiersCompacte },
    }))
      ? true
      : false;
  }
}
