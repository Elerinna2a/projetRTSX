export type CreateTraitement = {
  dateTraitement: string;
  qualite: string;
  quantiteCorpsEtranger: number;
  scoringBonusMalus: number;
  operateurId?: number;
  expeditionId?: number;
};

export type UpdateTraitement = {
  idTraitement: number;
  dateTraitement?: string;
  qualite?: string;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
  operateurId?: number;
  expeditionId?: number;
};

export type Traitement = {
  idTraitement: number;
  dateTraitement?: string;
  qualite?: string;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
  operateurId?: number;
  expeditionId?: number;
};
