import { Forme } from "@prisma/client";

export type CreateCollecte = {
  quantite: number;
  formeCollecte: Forme;
  dateCollecte: string;
  tierCollecte: number;
};

export type UpdateCollecte = {
  quantite?: number;
  formeCollecte?: Forme;
  dateCollecte?: string;
  tierCollecte?: number;
};
