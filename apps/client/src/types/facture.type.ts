import { TierCollecte, TiersCompacte } from "@prisma/client";

export type CreateFacture = {
  dateFacture: string;
  montant: number;
  datePaiementFacture: string;
  tierCompacte: TiersCompacte;
  tiersCollecte: TierCollecte;
};

export type UpdateFacture = {
  idFacture: number;
  dateFacture?: string;
  montant?: number;
  tierCompacte?: TiersCompacte;
  tiersCollecte?: TierCollecte;
};

export type Facture = {
  idFacture: number;
  dateFacture?: string;
  montant?: number;
  tierCompacte?: TiersCompacte;
  tiersCollecte?: TierCollecte;
};
