import { Role } from "@prisma/client";

export type CreateEmploye = {
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  role: Role;
  email: string;
  password: string;
  collectes?: {
    connect?: {
      idNumLot: number;
    }[];
  };
  traitements?: {
    connect?: {
      idTraitement: number;
    }[];
  };
  tournees?: {
    connect?: {
      idTournee: number;
    }[];
  };
};

export type UpdateEmploye = {
  nom?: string;
  prenom?: string;
  adresse?: string;
  tel?: string;
  role?: Role;
  email?: string;
  password?: string;
};
