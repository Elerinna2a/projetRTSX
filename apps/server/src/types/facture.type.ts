export type CreateFacture = {
  dateFacture: string;
  montang: number;
  nomTcId?: number;
  nomTcomId?: number;
  numExpId?: number;
};

export type UpdateFacture = {
  dateFacture?: string;
  montang?: number;
  nomTcId?: number;
  nomTcomId?: number;
  numExpId?: number;
};
