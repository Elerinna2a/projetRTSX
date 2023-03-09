import { map } from "nanostores";

export type TierCollecte = {
  id?: number;
  nom?: string;
  adresse?: string;
  type_tier?: string;
  score_facilite_acces?: any;
  contact_nom?: string;
  contact_email?: string;
  contact_num?: number;
};

export const tierCollecte = map<TierCollecte>({});

export function setTierCollecte(tierCollecteInfo: TierCollecte) {
  tierCollecte.set(tierCollecteInfo);
}

export function removeTierCollecte() {
  tierCollecte.set({});
}
