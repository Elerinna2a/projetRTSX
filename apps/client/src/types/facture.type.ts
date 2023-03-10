export type CreateFacture = {
  dateFacture: string;
  montant: number;
};

export type UpdateFacture = {
  idFacture: number;
  dateFacture?: string;
  montant?: number;
};

export type Facture = {
  idFacture: number;
  dateFacture?: string;
  montant?: number;
};
