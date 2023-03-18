import { Qualite } from "@prisma/client";

export type CreateTraitement = {
  dateTraitement: string;
  qualite: Qualite;
  quantiteCorpsEtranger: number;
  scoringBonusMalus: number;
  operateurId?: number;
  expeditionId?: number;
  collecte?: {
    connect?: {
      idNumLot: number;
    }[];
  };
};

export type UpdateTraitement = {
  dateTraitement?: string;
  qualite?: Qualite;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
  operateurId?: number | null;
  expeditionId?: number | null;
};
