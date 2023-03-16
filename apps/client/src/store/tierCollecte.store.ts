import { Role } from "@prisma/client";
import { map } from "nanostores";

export type TierCollecte = {
  nom?: string;
  adresse?: string;
  typeEntreprise?: string;
  scoringFacilite?: string;
  nomContact?: string;
  tel?: string;
  role?: Role;
  mail?: string;
  password?: string;
  dateCreation?: string;
  collectes?: {
    connect?: {
      idNumLot: number;
    }[];
    disconnect?: {
      idNumLot: number;
    }[];
  };
  factures?: {
    connect?: {
      idFacture: number;
    }[];
    disconnect?: {
      idFacture: number;
    }[];
  };
};

export const tierCollecte = map<TierCollecte>({});

export function setTierCollecte(tierCollecteInfo: TierCollecte) {
  tierCollecte.set(tierCollecteInfo);
}

export function removeTierCollecte() {
  tierCollecte.set({});
}
