import { map } from "nanostores";

export type Expedition = {
  id?: number;
  nom?: string;
  adresse?: string;
  type_tier?: string;
  score_facilite_acces?: any;
  contact_nom?: string;
  contact_email?: string;
  contact_num?: number;
};

export const expedition = map<Expedition>({});

export function setExpedition(expeditionInfo: Expedition) {
  expedition.set(expeditionInfo);
}

export function removeExpedition() {
  expedition.set({});
}
