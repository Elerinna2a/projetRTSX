import { Forme } from "@prisma/client";

export type CreateCollecte = {
  quantite: number;
  formeCollecte: Forme;
  dateCollecte: string;
  nomTierCollecte: string;
  employeId?: number | null;
  tiercollecteId?: number | null;
  traitementId?: number | null;
};

export type UpdateCollecte = {
  quantite?: number;
  formeCollecte?: Forme;
  dateCollecte?: string;
  nomTierCollecte?: string;
  employeId?: number | null;
  tiercollecteId?: number | null;
  traitementId?: number | null;
};

export type Collecte = {
  idNumLot: number;
  quantite: number;
  formeCollecte: Forme;
  dateCollecte: string;
  nomTierCollecte: string;
  employeId?: number | null;
  tiercollecteId?: number | null;
  traitementId?: number | null;
};
