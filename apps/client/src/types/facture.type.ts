export type CreateFacture = {
  dateFacture: string;
  montant: number;
  datePaiementFacture: string;
  tierCompacteId?: number;
  tiersCollecteId?: number;
};

export type UpdateFacture = {
  dateFacture?: string;
  montant?: number;
  datePaiementFacture?: string;
  tierCompacte?: number;
  tiersCollecte?: number;
};
