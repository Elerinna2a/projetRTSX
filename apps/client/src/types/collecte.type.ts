export type CreateCollecte = {
  quantite: number;
  formeCollecte: string;
  dateCollecte: string;
  nomTierCollecte: string;
  employeId?: number;
  tiercollecteId?: number;
  traitementId?: number;
};

export type UpdateCollecte = {
  quantite?: number;
  formeCollecte?: string;
  dateCollecte?: string;
  nomTierCollecte?: string;
  employeId?: number;
  tiercollecteId?: number;
  traitementId?: number;
};

export type Collecte = {
  idNumLot: number;
  quantite: number;
  formeCollecte: string;
  dateCollecte: string;
  nomTierCollecte: string;
  employeId: number;
  tiercollecteId: number;
  traitementId: number;
};
