import { Forme } from "@prisma/client";
import { map } from "nanostores";

export type Collecte = {
  idNumLot?: number;
  nomTierCollecte?: string;
  quantite?: number;
  formeCollecte?: Forme;
  dateCollecte?: string;
  traitementId?: number;
  employeId?: number;
  tierCollecte?: number;
};

export const tierCollecte = map<Collecte>({});

export function setCollecte(tierCollecteInfo: Collecte) {
  tierCollecte.set(tierCollecteInfo);
}

export function removeCollecte() {
  tierCollecte.set({});
}
