import { Role, Score } from "@prisma/client";

export type CreateTierCollecte = {
  nom: string;
  adresse: string;
  typeEntreprise: string;
  scoringFacilite: Score;
  nomContact: string;
  tel: string;
  role: Role;
  mail: string;
  password: string;
  dateCreation: string;
  collectes?: {
    connect?: {
      idNumLot: number;
    }[];
  };
  factures?: {
    connect?: {
      idFacture: number;
    }[];
  };
};

export type UpdateTierCollecte = {
  nom?: string;
  adresse?: string;
  typeEntreprise?: string;
  scoringFacilite?: Score;
  nomContact?: string;
  tel?: string;
  role?: Role;
  mail?: string;
  password?: string;
  dateCreation?: string;
  collectes?: {
    connect?: {
      idNumLot: number;
    }[];
    disconnect?: {
      idNumLot: number;
    }[];
  };
  factures?: {
    connect?: {
      idFacture: number;
    }[];
    disconnect?: {
      idFacture: number;
    }[];
  };
};
