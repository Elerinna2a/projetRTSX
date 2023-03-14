import { Forme, TierCollecte } from "@prisma/client";

export type CreateCollecte = {
  quantite: number;
  nomTierCollecte: string;
  formeCollecte: Forme;
  dateCollecte: string;
  traitementId?: number;
  employeId?: number;
  tierCollecte?: TierCollecte;
};

export type UpdateCollecte = {
  idNumLot: number;
  nomTierCollecte?: string;
  quantite?: number;
  formeCollecte?: Forme;
  dateCollecte?: string;
  traitementId?: number;
  employeId?: number;
  tierCollecte?: TierCollecte;
};

export type Collecte = {
  idNumLot: number;
  nomTierCollecte: string;
  quantite: number;
  formeCollecte: Forme;
  dateCollecte: string;
  traitementId: number;
  employeId: number;
  tierCollecte?: TierCollecte;
};
