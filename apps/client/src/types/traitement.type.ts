
export type CreateTraitement = {
  dateTraitement: string;
  qualite: string;
  quantiteCorpsEtranger: number;
  scoringBonusMalus: number;
};

export type UpdateTraitement = {
  dateTraitement?: string;
  qualite?: string;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
};

export type Traitement = {
  dateTraitement?: string;
  qualite?: string;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
};
