export type CreateTraitement = {
  dateTraitement: string;
  qualite: string;
  quantiteCorpsEtranger: number;
  scoringBonusMalus: number;
  operateur: number;
};

export type UpdateTraitement = {
  dateTraitement?: string;
  qualite?: string;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
  operateur?: number;
};
