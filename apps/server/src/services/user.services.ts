import { User } from "@prisma/client";
import { prismaClient } from "../prisma";
import { CreateUser, UpdateUser } from "../types/user.types";

export class UserService {
  async getUsers(): Promise<User[]> {
    const users = await prismaClient.user.findMany();
    return users;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: { id },
    });
    return user;
  }

  async createUser(data: CreateUser): Promise<User> {
    const newUser = await prismaClient.user.create({ data: data });
    return newUser;
  }

  async updateUser(id: number, data: UpdateUser): Promise<User | null> {
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async deleteUser(id: number): Promise<User | null> {
    const deletedUser = await prismaClient.user.delete({ where: { id } });
    return deletedUser;
  }

  async checkIfUserExists(id: number): Promise<boolean> {
    return (await prismaClient.user.findFirst({ where: { id } }))
      ? true
      : false;
  }
}
