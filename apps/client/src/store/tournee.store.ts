import { Employe, Remorque, TypeVehicule } from "@prisma/client";
import { map } from "nanostores";

export type Tournee = {
  idTournee?: number;
  dateTournee?: string;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
  chauffeurId?: Employe;
};

export const tournee = map<Tournee>({});

export function setTournee(tourneeInfo: Tournee) {
  tournee.set(tourneeInfo);
}

export function removeTournee() {
  tournee.set({});
}
