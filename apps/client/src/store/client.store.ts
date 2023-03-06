import { map } from "nanostores";

export type Client = {
  id?: number;
  nom?: string;
  adresse?: string;
  type_tier?: string;
  score_facilite_acces?: any;
  contact_nom?: string;
  contact_email?: string;
  contact_num?: number;
};

export const client = map<Client>({});

export function setClient(clientInfo: Client) {
  client.set(clientInfo);
}

export function removeClient() {
  client.set({});
}
