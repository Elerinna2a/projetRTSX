export type CreateTraitement = {
  dateTraitement: string;
  qualite: string;
  quantiteCorpsEtranger: number;
  scoringBonusMalus: number;
};

export type UpdateTraitement = {
  idTraitement?: number;
  dateTraitement?: string;
  qualite?: string;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
};

export type Traitement = {
  idTraitement?: number;
  dateTraitement?: string;
  qualite?: string;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
};
