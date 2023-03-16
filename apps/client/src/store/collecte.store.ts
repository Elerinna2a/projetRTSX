import { Forme } from "@prisma/client";
import { map } from "nanostores";

export type Collecte = {
  idNumLot?: number;
  quantite?: number;
  formeCollecte?: Forme;
  dateCollecte?: string;
  nomTierCollecte?: string;
  employeId?: number;
  tierCollecteId?: number;
  traitementId?: number;
};

export const collecte = map<Collecte>({});

export function setCollecte(collecteInfo: Collecte) {
  collecte.set(collecteInfo);
}

export function removeCollecte() {
  collecte.set({});
}
