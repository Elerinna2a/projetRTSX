import { map } from "nanostores";

export type Facture = {
  idFacture?: number;
  dateFacture?: string;
  montant?: number;
  datePaiementFacture?: string;
  tierCompacte?: number;
  tiersCollecte?: number;
};

export const facture = map<Facture>({});

export function setFacture(factureInfo: Facture) {
  facture.set(factureInfo);
}

export function removeFacture() {
  facture.set({});
}
