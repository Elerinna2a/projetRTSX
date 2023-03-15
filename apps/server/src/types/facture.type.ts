import { TierCollecte, TiersCompacte } from "@prisma/client";

export type CreateFacture = {
  dateFacture: string;
  montant: number;
  datePaiementFacture: string;
  tierCompacte: TiersCompacte;
  tiersCollecte: TierCollecte;
};

export type UpdateFacture = {
  dateFacture?: string;
  montant?: number;
  datePaiementFacture: string;
  tierCompacte?: TiersCompacte;
  tiersCollecte?: TierCollecte;
};
