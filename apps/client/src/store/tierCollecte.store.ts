import { map } from "nanostores";

export type TierCollecte = {
  idTierCollecte?: number;
  nom?: string;
  adresse?: string;
  typeEntreprise?: string;
  scoringFacilite?: any;
  nomContact?: string;
  tel?: string;
  mail?: string;
  password?: string;
  dateCreation?: string;
  collecteId?: number;
  factureId?: number;
};

export const tierCollecte = map<TierCollecte>({});

export function setTierCollecte(tierCollecteInfo: TierCollecte) {
  tierCollecte.set(tierCollecteInfo);
}

export function removeTierCollecte() {
  tierCollecte.set({});
}
