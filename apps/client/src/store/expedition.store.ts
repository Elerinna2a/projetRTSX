import { map } from "nanostores";

export type Expedition = {
  idNumBl?: number;
  dateExpedition?: string;
  destinataire?: string;
  nbPalette?: number;
  poidNetTotal?: number;
  tiersCompacteId?: number;
  traitementId?: number;
  factureId?: number;
};

export const expedition = map<Expedition>({});

export function setExpedition(expeditionInfo: Expedition) {
  expedition.set(expeditionInfo);
}

export function removeExpedition() {
  expedition.set({});
}
