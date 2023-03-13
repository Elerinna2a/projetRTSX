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
  dateCreation?: string;
  tourneeId?: number;
  traitementId?: number;
};

export const employe = map<Employe>({});

export function setEmploye(employeInfo: Employe) {
  employe.set(employeInfo);
}

export function removeEmploye() {
  employe.set({});
}
