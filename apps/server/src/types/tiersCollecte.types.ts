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
  dateCreation: Date;
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
  dateCreation?: Date;
};
