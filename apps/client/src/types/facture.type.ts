export type CreateFacture = {
  dateFacture: string;
  montant: number;
  datePaiementFacture: string;
  tierCompacteId?: number;
  tiersCollecteId?: number;
};

export type UpdateFacture = {
  idFacture: number;
  dateFacture?: string;
  montant?: number;
  datePaiementFacture?: string;
  tierCompacteId?: number;
  tiersCollecteId?: number;
};
