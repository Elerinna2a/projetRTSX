import { Forme, TierCollecte } from "@prisma/client";
import { map } from "nanostores";

export type Collecte = {
  idNumLot?: number;
  nomTierCollecte?: string;
  quantite?: number;
  formeCollecte?: Forme;
  dateCollecte?: string;
  traitementId?: number;
  employeId?: number;
  tierCollecte?: TierCollecte;
};

export const tierCollecte = map<Collecte>({});

export function setCollecte(tierCollecteInfo: Collecte) {
  tierCollecte.set(tierCollecteInfo);
}

export function removeCollecte() {
  tierCollecte.set({});
}
