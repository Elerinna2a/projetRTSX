import { map } from "nanostores";

export type TiersCompacte = {
  idTiersCompacte?: number;
  nom?: string;
  adresse?: string;
  typeTiers?: string;
  contactNom?: string;
  tel?: string;
  mail?: string;
  expedition?: {
    connect?: {
      idNumBl: number;
    }[];
  };
  factures?: {
    connect?: {
      idFacture: number;
    }[];
  };
};

export const tierCompacte = map<TiersCompacte>({});

export function setTierCompacte(tierCompacteInfo: TiersCompacte) {
  tierCompacte.set(tierCompacteInfo);
}

export function removeTierCompacte() {
  tierCompacte.set({});
}
