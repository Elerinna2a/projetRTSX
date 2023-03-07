import { Score } from "@prisma/client";

export type CreateTierCollecte = {
  nom: string;
  adresse: string;
  typeEntreprise: string;
  scoringFacilite: Score;
  nomContact: String;
  tel: string;
  mail: string;
  password: string;
  dateCreation: string;
};

export type UpdateTierCollecte = {
  nom?: string;
  adresse?: string;
  typeEntreprise?: string;
  scoringFacilite?: Score;
  nomContact?: String;
  tel?: string;
  mail?: string;
  password?: string;
  dateCreation?: string;
};
