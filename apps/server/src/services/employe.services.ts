import { Employe } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateEmploye, UpdateEmploye } from "../types/employe.types";

export class EmployeService {
  async getEmploye(): Promise<Employe[]> {
    const employes = await prismaClient.employe.findMany();
    return employes;
  }

  async getEmployeById(id: number): Promise<Employe | null> {
    const employe = await prismaClient.employe.findFirst({
      where: { id },
    });
    return employe;
  }

  async createEmploye(data: CreateEmploye): Promise<Employe> {
    const newEmploye = await prismaClient.employe.create({ data: data });
    return newEmploye;
  }

  async updateEmploye(
    id: number,
    data: UpdateEmploye
  ): Promise<Employe | null> {
    const updatedUser = await prismaClient.employe.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async deleteEmploye(id: number): Promise<Employe | null> {
    const deletedUser = await prismaClient.employe.delete({ where: { id } });
    return deletedUser;
  }

  async checkIfEmployeExists(id: number): Promise<boolean> {
    return (await prismaClient.employe.findFirst({ where: { id } }))
      ? true
      : false;
  }
}
