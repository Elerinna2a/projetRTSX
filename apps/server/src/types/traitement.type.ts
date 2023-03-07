import { Qualite } from "@prisma/client";

export type CreateTraitement = {
  dateTraitement: string;
  qualite: Qualite;
  quantiteCorpsEtranger: number;
  scoringBonusMalus: number;
  operateurId: number;
};

export type UpdateTraitement = {
  dateTraitement?: string;
  qualite?: Qualite;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
  operateurId?: number;
};
