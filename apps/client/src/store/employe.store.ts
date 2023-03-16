import { Role } from "@prisma/client";
import { map } from "nanostores";

export type Employe = {
  id?: number;
  nom?: string;
  prenom?: string;
  adresse?: string;
  tel?: string;
  role?: Role;
  email?: string;
  password?: string;
  dateCreation?: Date;
  session?: string;
  collectes?: {
    connect?: {
      idNumLot: number;
    }[];
  };
  traitements?: {
    connect?: {
      idTraitement: number;
    }[];
  };
  tournees?: {
    connect?: {
      idTournee: number;
    }[];
  };
};

export const employeStore = map<Employe>({});

export function setEmploye(employeInfo: Employe) {
  employeStore.set(employeInfo);
}

export function removeEmploye() {
  employeStore.set({});
}
