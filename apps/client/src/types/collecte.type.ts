export type CreateCollecte = {
  quantite: number;
  formeCollecte: string;
  dateCollecte: string;
  TierCollecteId: number;
  employeId: number;
  expeditionId: number;
  traitementId: number;
};

export type UpdateCollecte = {
  idNumLot: number;
  quantite?: number;
  formeCollecte?: string;
  dateCollecte?: string;
  TierCollecteId?: number;
  employeId?: number;
  expeditionId?: number;
  traitementId?: number;
};

export type Collecte = {
  idNumLot: number;
  quantite: number;
  formeCollecte: string;
  dateCollecte: string;
  TierCollecteId: number;
  employeId: number;
  expeditionId: number;
  traitementId: number;
};
