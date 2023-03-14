import { Qualite } from "@prisma/client";

export type CreateTraitement = {
  dateTraitement: string;
  qualite: Qualite;
  quantiteCorpsEtranger: number;
  scoringBonusMalus: number;
};

export type UpdateTraitement = {
  idTraitement: number;
  dateTraitement?: Date;
  qualite?: Qualite;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
};

export type Traitement = {
  idTraitement: number;
  dateTraitement?: Date;
  qualite?: Qualite;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
};
