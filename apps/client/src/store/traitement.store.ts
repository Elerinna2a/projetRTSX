import { map } from "nanostores";

export type Traitement = {
  idTraitement?: number;
  dateTraitement?: string;
  qualite?: string;
  quantiteCorpsEtranger?: number;
  scoringBonusMalus?: number;
  operateurId?: number;
  expeditionId?: number;
  collecte?: {
    connect?: {
      idNumLot: number;
    }[];
  };
};

export const traitement = map<Traitement>({});

export function setTraitement(traitementInfo: Traitement) {
  traitement.set(traitementInfo);
}

export function removeTraitement() {
  traitement.set({});
}
