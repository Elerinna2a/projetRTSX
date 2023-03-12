import { map } from "nanostores";

export type Facture = {
  id?: number;
  nom?: string;
  adresse?: string;
  type_tier?: string;
  score_facilite_acces?: any;
  contact_nom?: string;
  contact_email?: string;
  contact_num?: number;
};

export const facture = map<Facture>({});

export function setFacture(factureInfo: Facture) {
  facture.set(factureInfo);
}

export function removeFacture() {
  facture.set({});
}
