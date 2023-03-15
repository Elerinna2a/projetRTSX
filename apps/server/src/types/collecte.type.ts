

export type CreateCollecte = {
  quantite: number;
  nomTierCollecte: string;
  formeCollecte: string;
  dateCollecte: string;
  traitementId?: number;
  employeId?: number;
  tiercollecteId?: number;
};

export type UpdateCollecte = {
  idNumLot: number;
  nomTierCollecte?: string;
  quantite?: number;
  formeCollecte?: string;
  dateCollecte?: string;
  traitementId?: number;
  employeId?: number;
  tiercollecteId?: number;
};

export type Collecte = {
  idNumLot: number;
  nomTierCollecte: string;
  quantite: number;
  formeCollecte: string;
  dateCollecte: string;
  traitementId: number;
  employeId: number;
  tiercollecteId?: number;
};
