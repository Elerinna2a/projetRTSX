import { Forme } from "@prisma/client";

export type CreateCollecte = {
  quantite: number;
  nomTierCollecte: string;
  formeCollecte: Forme;
  dateCollecte: string;
  traitementId?: number;
  employeeId?: number;
};

export type UpdateCollecte = {
  idNumLot: number;
  nomTierCollecte?: string;
  quantite?: number;
  formeCollecte?: string;
  dateCollecte?: string;
  traitementId?: number;
  employeeId?: number;
};

export type Collecte = {
  idNumLot: number;
  nomTierCollecte: string;
  quantite: number;
  formeCollecte: string;
  dateCollecte: string;
  traitementId: number;
  employeeId: number;
};
