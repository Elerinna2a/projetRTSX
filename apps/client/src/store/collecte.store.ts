import { map } from "nanostores";

export type Collecte = {
  idNumLot?: number;
  quantite?: number;
  formeCollecte?: string;
  dateCollecte?: string;
  nomTierCollecte?: string;
  employeId?: number;
  tiercollecteId?: number;
  traitementId?: number;
};

export const tierCollecte = map<Collecte>({});

export function setCollecte(tierCollecteInfo: Collecte) {
  tierCollecte.set(tierCollecteInfo);
}

export function removeCollecte() {
  tierCollecte.set({});
}
