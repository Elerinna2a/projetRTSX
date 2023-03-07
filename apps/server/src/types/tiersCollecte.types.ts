import { Score } from "@prisma/client";

export type CreateTierCollecte = {
  nom: string;
  adresse: string;
  typeEntreprise: string;
  scoringFacilite: Score;
  nomContact: string;
  tel: string;
  mail: string;
  password: string;
  dateCreation: string;
  tourneeId: number;
};

export type UpdateTierCollecte = {
  nom?: string;
  adresse?: string;
  typeEntreprise?: string;
  scoringFacilite?: Score;
  nomContact?: string;
  tel?: string;
  mail?: string;
  password?: string;
  dateCreation?: string;
  tourneeID?: number;
};
