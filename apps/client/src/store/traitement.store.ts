import { map } from "nanostores";

export type Traitement = {
  id?: number;
  nom?: string;
  adresse?: string;
  type_tier?: string;
  score_facilite_acces?: any;
  contact_nom?: string;
  contact_email?: string;
  contact_num?: number;
};

export const traitement = map<Traitement>({});

export function setTraitement(traitementInfo: Traitement) {
  traitement.set(traitementInfo);
}

export function removeTraitement() {
  traitement.set({});
}
