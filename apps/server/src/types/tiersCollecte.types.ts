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
  collecteId?: number;
  factureId?: number;
};

export type UpdateTierCollecte = {
  idTierCollecte: number;
  nom?: string;
  adresse?: string;
  typeEntreprise?: string;
  scoringFacilite?: Score;
  nomContact?: string;
  tel?: string;
  mail?: string;
  password?: string;
  dateCreation?: Date;
  collecteId?: number;
  factureId?: number;
};

export type TierCollecte = {
  idTierCollecte: number;
  nom?: string;
  adresse?: string;
  typeEntreprise?: string;
  scoringFacilite?: Score;
  nomContact?: string;
  tel?: string;
  mail?: string;
  password?: string;
  dateCreation?: Date;
  collecteId?: number;
  factureId?: number;
};
