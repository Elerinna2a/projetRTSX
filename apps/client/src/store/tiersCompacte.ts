import { Expedition, Facture } from "@prisma/client";
import { map } from "nanostores";

export type TierCompacte = {
  idTiersCompacte?: number;
  nom?: string;
  adresse?: string;
  typeTiers?: string;
  contactNom?: string;
  tel?: string;
  mail?: string;
  facture?: Facture;
  expedition?: Expedition;
};

export const tierCompacte = map<TierCompacte>({});

export function setTierCompacte(tierCompacteInfo: TierCompacte) {
  tierCompacte.set(tierCompacteInfo);
}

export function removeTierCompacte() {
  tierCompacte.set({});
}
