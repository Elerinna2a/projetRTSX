export type CreateFacture = {
  dateFacture: Date;
  montant: number;
};

export type UpdateFacture = {
  idFacture: number;
  dateFacture?: Date;
  montant?: number;
};

export type Facture = {
  idFacture: number;
  dateFacture?: Date;
  montant?: number;
};
