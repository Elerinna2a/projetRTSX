import { Forme } from "@prisma/client";

export type CreateCollecte = {
  quantite: number;
  formeCollecte: Forme;
  dateCollecte: string;
  TierCollecteId: number;
  employeId: number;
  expeditionId: number;
  traitementId: number;
};

export type UpdateCollecte = {
  quantite?: number;
  formeCollecte?: Forme;
  dateCollecte?: string;
  TierCollecteId?: number;
  employeId?: number;
  expeditionId?: number;
  traitementId?: number;
};
