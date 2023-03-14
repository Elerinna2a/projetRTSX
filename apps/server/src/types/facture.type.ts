export type CreateFacture = {
  dateFacture: string;
  montant: number;
  nomTierCollecte?: {};
  nomTiersTompacte?: {};
  num_expedition?: {};
};

export type UpdateFacture = {
  idFacture: number;
  dateFacture?: string;
  montant?: number;
  nomTierCollecte?: {};
  nomTiersTompacte?: {};
  num_expedition?: {};
};

export type Facture = {
  idFacture: number;
  dateFacture?: string;
  montant?: number;
  nomTierCollecte?: {};
  nomTiersTompacte?: {};
  num_expedition?: {};
};
