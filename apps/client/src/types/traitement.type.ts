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
  idTraitement: number;
  dateTraitement?: string;
  qualite?: Qualite;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
  operateurId?: number;
  expeditionId?: number;
};

export type Traitement = {
  idTraitement: number;
  dateTraitement?: string;
  qualite?: Qualite;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
  operateurId?: number;
  expeditionId?: number;
};
