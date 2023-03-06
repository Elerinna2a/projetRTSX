import { TierCollecte } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateClient, UpdateClient } from "../types/client.types";

export class ClientService {
  async getClients(): Promise<TierCollecte[]> {
    const clients = await prismaClient.tierCollecte.findMany();
    return clients;
  }

  async getClientById(id: number): Promise<TierCollecte | null> {
    const client = await prismaClient.tierCollecte.findFirst({
      where: { id },
    });
    return client;
  }

  async createClient(data: CreateClient): Promise<TierCollecte | null> {
    const newClient = await prismaClient.tierCollecte.create({ data: data });
    return newClient;
  }

  async updateClient(
    id: number,
    data: UpdateClient
  ): Promise<TierCollecte | null> {
    const updatedClient = await prismaClient.tierCollecte.update({
      where: { id },
      data,
    });
    return updatedClient;
  }

  async deleteClient(id: number): Promise<TierCollecte | null> {
    const deletedClient = await prismaClient.tierCollecte.delete({
      where: { id },
    });
    return deletedClient;
  }

  async checkIfClientExists(id: number): Promise<boolean> {
    return (await prismaClient.tierCollecte.findFirst({ where: { id } }))
      ? true
      : false;
  }
}
