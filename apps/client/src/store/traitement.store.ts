import { Qualite } from "@prisma/client";
import { map } from "nanostores";

export type Traitement = {
  idTraitement?: number;
  dateTraitement?: string;
  qualite?: Qualite;
  quantiteCorpsEtranger?: string;
  scoringBonusMalus?: any;
};

export const traitement = map<Traitement>({});

export function setTraitement(traitementInfo: Traitement) {
  traitement.set(traitementInfo);
}

export function removeTraitement() {
  traitement.set({});
}
