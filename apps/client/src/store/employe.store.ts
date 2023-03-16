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

export const employe = map<Employe>({});

export function setEmploye(employeInfo: Employe) {
  employe.set(employeInfo);
}

export function removeEmploye() {
  employe.set({});
}
