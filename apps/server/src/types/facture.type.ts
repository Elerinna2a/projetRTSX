export type CreateFacture = {
  dateFacture: string;
  montant: number;
  nomTcId: number;
  nomTcomId: number;
  numExpId: number;
};

export type UpdateFacture = {
  dateFacture?: string;
  montant?: number;
  nomTcId?: number;
  nomTcomId?: number;
  numExpId?: number;
};
