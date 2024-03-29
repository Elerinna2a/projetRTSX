import { map } from "nanostores";

export type Tournee = {
  idTournee?: number;
  dateTournee?: string;
  typeVehicule?: string;
  remorque?: string;
  chauffeurId?: number;
  tierCollecteId?: number;
};

export const tournee = map<Tournee>({});

export function setTournee(tourneeInfo: Tournee) {
  tournee.set(tourneeInfo);
}

export function removeTournee() {
  tournee.set({});
}
