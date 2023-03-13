import { Forme, TierCollecte } from "@prisma/client";

export type CreateCollecte = {
  quantite: number;
  nomTierCollecte: string;
<<<<<<< HEAD
  formeCollecte: string;
=======
  formeCollecte: Forme;
>>>>>>> f17e9281fb353b8adf6960965551f9d2dbe7aa9c
  dateCollecte: Date;
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
  employeeId?: number;
  tierCollecte?: TierCollecte;
};

export type Collecte = {
  idNumLot: number;
  nomTierCollecte: string;
  quantite: number;
  formeCollecte: string;
  dateCollecte: string;
  traitementId: number;
  employeeId: number;
  tierCollecte?: TierCollecte;
};
