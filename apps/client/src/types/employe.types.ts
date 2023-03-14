import { Role } from "@prisma/client";

export type CreateEmploye = {
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  role: Role;
  email: string;
  password: string;
  tourneeId?: number;
  traitementId?: number;
};

export type UpdateEmploye = {
  id: number;
  nom?: string;
  prenom?: string;
  adresse?: string;
  tel?: string;
  role?: Role;
  email?: string;
  password?: string;
  dateCreation?: Date;
  tourneeId?: number;
  traitementId?: number;
};

export type Employe = {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  role: Role;
  email: string;
  password: string;
  dateCreation: Date;
  tourneeId: number;
  traitementId: number;
};
