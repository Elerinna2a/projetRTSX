export type CreateFacture = {
  dateFacture: string;
  montant: number;
  nomTcId: number;
  nomTcomId: number;
  numExpId: number;
};

export type UpdateFacture = {
  idFacture?: number;
  dateFacture?: string;
  montant?: number;
  nomTcId?: number;
  nomTcomId?: number;
  numExpId?: number;
};
