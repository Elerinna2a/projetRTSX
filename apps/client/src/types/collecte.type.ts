import { Forme } from "@prisma/client";

export type CreateCollecte = {
  quantite: number;
  formeCollecte: Forme;
  dateCollecte: string;
  nomTierCollecte: string;
  employeId?: number;
  tiercollecteId?: number;
  traitementId?: number;
};

export type UpdateCollecte = {
  idNumLot: number;
  quantite?: number;
  formeCollecte?: Forme;
  dateCollecte?: string;
  nomTierCollecte?: string;
  employeId?: number;
  tiercollecteId?: number;
  traitementId?: number;
};
