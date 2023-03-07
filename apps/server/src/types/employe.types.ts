import { Role } from "@prisma/client";

export type CreateEmploye = {
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  role: Role;
  email: string;
  password: string;
};

export type UpdateEmploye = {
  nom?: string;
  prenom?: string;
  tel?: string;
  adresse?: string;
  role?: Role;
  email?: string;
  password?: string;
};
